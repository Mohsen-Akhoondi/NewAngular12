import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
@Component({
  selector: 'app-choosen-request-revocation',
  templateUrl: './choosen-request-revocation.component.html',
  styleUrls: ['./choosen-request-revocation.component.css']
})
export class ChoosenRequestRevocationComponent implements OnInit {
  @Input() PopupParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutPutParam: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('IsReadyToConfirm') IsReadyToConfirm: TemplateRef<any>;
  btnclicked = false;
  type: string;
  HaveHeader: boolean;
  startLeftPosition;
  startTopPosition;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  Select = false;
  closee;
  WorkflowObjectCode;
  columnDef;
  FinishedcolumnDef;
  selectedRow;
  UserWorkListrowData: any;
  UserRevocListrowData: any;
  btnRevocationName = 'ابطال';
  btnRevocationIcon = 'revocation';
  IsFinishCartableClick;
  MinHeightPixel = null;
  currentRegionObject;
  AutomationParam;
  ModuleCode;
  constructor(private route: ActivatedRoute,
    private UserSettings: UserSettingsService,
    private ProductRequest: ProductRequestService,
    private RefreshCartable: RefreshServices) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'تایید',
        width: 45,
        autoHeight: true,
        resizable: true,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsReadyToConfirm
        }
      },
      {
        headerName: 'نوع درخواست ',
        field: 'WorkflowTypeName',
        width: 90,
        resizable: true
      },
      {
        headerName: ' ارجاع دهنده ',
        field: 'FullReferenceUserName',
        width: 240,
        resizable: true
      },
      {
        headerName: ' توضیحات',
        field: 'Note',
        width: 200,
        resizable: true
      },
      {
        headerName: 'تاریخ',
        field: 'WorkFlowPersianDate',
        width: 210,
        resizable: true
      },
      {
        headerName: 'کد ',
        field: 'ObjectCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'شماره ',
        field: 'ObjectNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'تاریخ ',
        field: 'ObjectPersianDate',
        width: 90,
        resizable: true
      },
      {
        headerName: 'موضوع ',
        field: 'ObjectSubject',
        width: 160,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ObjectActorName',
        width: 150,
        resizable: true
      }
    ];
    this.FinishedcolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'نوع درخواست ',
        field: 'WorkflowTypeName',
        width: 90,
        resizable: true
      },
      {
        headerName: ' ارجاع دهنده ',
        field: 'ReferenceUserName',
        width: 140,
        resizable: true
      },
      {
        headerName: ' توضیحات',
        field: 'Note',
        width: 200,
        resizable: true
      },
      {
        headerName: 'تاریخ',
        field: 'WorkFlowPersianDate',
        width: 210,
        resizable: true
      },
      {
        headerName: 'کد ',
        field: 'ObjectCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'شماره ',
        field: 'ObjectNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'تاریخ ',
        field: 'ObjectPersianDate',
        width: 90,
        resizable: true
      },
      {
        headerName: 'موضوع ',
        field: 'ObjectSubject',
        width: 160,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ObjectActorName',
        width: 150,
        resizable: true
      }
    ];
  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.UserSettings.GetUserWorkListForRevocation(this.PopupParam.ObjectID, this.PopupParam.RegionCode).subscribe(res => {
      res.forEach(element => {
        element.FullReferenceUserName = element.ReferenceRoleName ? element.ReferenceRoleName + ' - ' + element.ReferenceUserName : '';
      });
      this.UserWorkListrowData = res;
    });
  }
  ShowMessageBoxWithOkBtn(message) {
    this.type = 'message-box';
    this.btnclicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  RowrevocClick(event) {
    this.selectedRow = event.data;
  }
  Rowreturnrevoclick(event) {
    this.selectedRow = event.data;
  }
  onRevocationClick() {
    // tslint:disable-next-line:max-line-length
    this.ProductRequest.RequestRevocation(this.selectedRow, this.selectedRow.WorkflowID, this.selectedRow.CostFactorID, this.selectedRow.WorkflowTypeCode, this.ModuleCode, this.PopupParam.OrginalModuleCode).subscribe(res => {
      if (res === 3) {
        this.ShowMessageBoxWithOkBtn('ابطال درخواست انجام معامله با موفقیت انجام شد');
        this.ngOnInit();
        this.RefreshCartable.RefreshCartable();
      } else if (res === 2) {
        this.ShowMessageBoxWithOkBtn('بازگشت از ابطال درخواست انجام معامله با موفقیت انجام شد');
        this.GetFinishCartableRowData();
        this.RefreshCartable.RefreshCartable();
      } else if (res === -1) {
        this.ShowMessageBoxWithOkBtn('مسیر ' + ' ' + this.btnRevocationName + ' ' + ' به درستی تعریف نشده است با راهبر تماس بگیرید');
      } else {
        this.ShowMessageBoxWithOkBtn(' امکان' + ' ' + this.btnRevocationName + ' ' + 'وجود ندارد ');
      }
    });
  }
  popupclosed() {
    this.btnclicked = false;
    this.Closed.emit(true);
  }
  popupclosedwithoutexit() {
    this.btnclicked = false;
  }
  onAutomationClick(InputLetterTypeCode = null) {
    if (this.selectedRow) {
      if (!isUndefined(this.selectedRow.RegionCode) && this.selectedRow.CostFactorID) {
        let LetterTypeCodeList = [];
        LetterTypeCodeList.push(19);
        this.btnclicked = true;
        this.type = 'app-automation';
        this.HaveHeader = true;
        this.startLeftPosition = 144;
        this.startTopPosition = 42;
        this.MinHeightPixel = 300;
        this.AutomationParam = {
          CostFactorID: this.selectedRow.CostFactorID,
          RegionCode: this.selectedRow.RegionCode,
          LetterTypeCodeList: LetterTypeCodeList,
          OrganizationCode: this.PopupParam.OrganizationCode,
          AutoClose: true,
          SaveMode: true,
        };
      }
    }
  }
  OnFinishCartableClick(IsFinishCartableClick) {
    this.IsFinishCartableClick = IsFinishCartableClick;
    this.GetFinishCartableRowData();
  }

  GetFinishCartableRowData() {
    if (this.IsFinishCartableClick) {
      this.btnRevocationName = 'بازگشت از ابطال';
      this.btnRevocationIcon = 'ok';
      this.UserSettings.GetUserWorkListForReturnRevocation(this.PopupParam.ObjectID, this.PopupParam.RegionCode).subscribe(ress => {
        this.UserRevocListrowData = ress;
      });
    }
  }
}
