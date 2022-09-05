import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css']
})
export class AutomationComponent implements OnInit {
  @Input() PopupParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() PopupOutPutParam: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('ShowLetter') ShowLetter: TemplateRef<any>;
  @ViewChild('DeleteLetter') DeleteLetter: TemplateRef<any>;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  @ViewChild('IsArchive') Archive: TemplateRef<any>;
  LetterDate: any;
  columnDef;
  RowData;
  RegisterLetterNo;
  LetterNo: any;
  isClicked: boolean;
  PopUpType: string;
  HaveHeader: boolean;
  SaveMode: boolean;
  HaveMaxBtn: boolean;
  startLeftPosition: number;
  startTopPosition;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  SelectedDocument: any;
  ReceiveDocID = null;
  LetterTypecolumnDef;
  LetterTypeRowData;
  LetterTypeCodeList = [];
  SelectedLetterType: any;
  LetterscolumnDef;
  LettersRowData;
  CostFactorLetter = {
    CostFactorID: null,
    LetterTypeCode: null,
    OrganizationCode: null,
    ReceiveDocID: null,
    ProposalID: null,
    RegionCode: null,
    LetterNo: null
  };
  IsArchive = false;
  ReadOnlyMode = false;
  constructor(private Automation: AutomationService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'شماره نامه',
        field: 'DocumentLetterNo',
        width: 110,
        resizable: true
      },
      {
        headerName: 'تاریخ نامه',
        field: 'DocumentLetterDate',
        width: 110,
        resizable: true
      },
      {
        headerName: 'شماره ثبت نامه',
        field: 'RegisterLetterNo',
        width: 110,
        resizable: true
      },
      {
        headerName: 'موضوع نامه',
        field: 'DocumentSubject',
        width: 400,
        resizable: true
      },
    ];

    this.LetterTypecolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع نامه',
        field: 'LetterTypeName',
        width: 300,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 50;

    this.LetterscolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'شماره نامه',
        field: 'LetterNo',
        width: 200,
        resizable: true
      },
      {
        headerName: 'تاریخ نامه',
        field: 'PersianLetterDate',
        width: 150,
        resizable: true
      },
      {
        headerName: 'بایگانی',
        field: 'IsArchive',
        width: 80,
        resizable: true,
        editable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        valueFormatter: function isValidFormer(params) {
          if (params.value) {
            return 'معتبر';
          } else {
            return 'نامعتبر';
          }
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.Archive
        },
      },
      {
        headerName: 'مشاهده نامه',
        field: '',
        width: 100,
        sortable: false,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowLetter,
        }
      },
      {
        headerName: 'حذف نامه',
        field: '',
        width: 80,
        sortable: false,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.DeleteLetter,
        }
      },
    ];
    this.ReadOnlyMode = this.PopupParam.ReadOnlyMode ? this.PopupParam.ReadOnlyMode : false; //RFC 53579
    this.SaveMode = this.PopupParam.SaveMode ? this.PopupParam.SaveMode : false;
    this.RowData = [];
    this.LetterTypeCodeList = this.PopupParam.LetterTypeCodeList;
    this.LetterTypeRowData = [];
    this.LettersRowData = [];
    if (this.PopupParam.ReceiveDocID) {
      this.ReceiveDocID = this.PopupParam.ReceiveDocID;
    }
    this.Automation.GetLetterTypeList(this.LetterTypeCodeList).subscribe(res => {
      this.LetterTypeRowData = res;
    });

    this.CostFactorLetter.CostFactorID = this.PopupParam.CostFactorID;
    this.CostFactorLetter.OrganizationCode = this.PopupParam.OrganizationCode;
    this.CostFactorLetter.ReceiveDocID = this.PopupParam.ReceiveDocID ? this.PopupParam.ReceiveDocID : null;
    this.CostFactorLetter.ProposalID = this.PopupParam.ProposalID ? this.PopupParam.ProposalID : null;
    this.CostFactorLetter.RegionCode = this.PopupParam.RegionCode;

  }

  OnLetterDateChange(ADate) {
    this.LetterDate = ADate.MDate;
  }

  onSearchClick() {

    if (!this.RegisterLetterNo && !this.LetterNo) {
      this.ShowMessageBoxWithOkBtn('شماره ثبت نامه یا شماره نامه را وارد کنید');
      return;
    }

    if (!this.LetterDate) {
      this.ShowMessageBoxWithOkBtn('تاریخ نامه نمی تواند خالی باشد');
      return;
    }

    if (!this.RegisterLetterNo && this.LetterNo) {
      this.RegisterLetterNo = this.LetterNo;
    }


    if (this.RegisterLetterNo && !this.LetterNo) {
      this.LetterNo = this.RegisterLetterNo;
    }

    this.Automation.SearchAllDocument(this.PopupParam.RegionCode,
      this.PopupParam.OrganizationCode,
      this.RegisterLetterNo,
      this.LetterNo,
      this.LetterDate,
      this.IsArchive).subscribe(res => {
        this.RowData = res;
      });
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 533;
    this.startTopPosition = 227;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  popupclosed(event) {
    this.isClicked = false;
    this.PopUpType = '';
  }
  RowClick(event) {
    this.SelectedDocument = event.data;
  }
  onSave() {
    this.CostFactorLetter.LetterNo = null;
    if (!this.SelectedDocument) {
      this.ShowMessageBoxWithOkBtn('نامه ای جهت اتصال انتخاب نشده است');
      return;
    }

    // tslint:disable-next-line: max-line-length
    if (!this.CostFactorLetter.LetterTypeCode) {
      this.ShowMessageBoxWithOkBtn('نوع نامه جهت اتصال انتخاب نشده است');
      return;
    }

    if ((this.CostFactorLetter.RegionCode >= 210 && this.CostFactorLetter.RegionCode <= 218) && this.CostFactorLetter.LetterTypeCode === 20 && this.PopupParam.ModuleViewTypeCode == 99 && (this.LetterDate < this.PopupParam.ProductRequestDate)) { 
      this.ShowMessageBoxWithOkBtn('تاریخ نامه اتوماسیونی HSE کوچکتر از تاریخ درخواست می باشد');
      return;
    } // 63371

    this.Automation.SaveLetter(this.CostFactorLetter,
      this.SelectedDocument, this.PopupParam.OrginalModuleCode)
      .subscribe(res => {
        this.ShowMessageBoxWithOkBtn('اتصال نامه با موفقیت انجام شد');
        this.GetCostFactorLetterList();
        const OutPutObj = {
          SelectedDocument: this.SelectedDocument,
          LetterTypeCode: this.CostFactorLetter.LetterTypeCode,
        };
        this.PopupOutPutParam.emit(OutPutObj);
      });
  }

  onConfirm() {
    if (!this.SelectedDocument) {
      this.ShowMessageBoxWithOkBtn('نامه ای جهت اتصال انتخاب نشده است');
      return;
    }
    this.PopupOutPutParam.emit(this.SelectedDocument);
    this.onClose();
  }

  onClose() {
    this.Closed.emit(true);
  }

  LetterTypeRowClick(event) {

    this.SelectedLetterType = event.data.LetterTypeCode;
    this.CostFactorLetter.LetterTypeCode = this.SelectedLetterType;
    this.GetCostFactorLetterList();
  }

  onShowLetterClick(row) {

    this.CostFactorLetter.LetterNo = row.LetterNo;
    this.Automation.ShowLetter(this.CostFactorLetter);

  }

  onDeleteLetterClick(row) {

    this.CostFactorLetter.LetterNo = row.LetterNo;
    this.Automation.DeleteLetter(this.CostFactorLetter, this.PopupParam.OrginalModuleCode).subscribe(res => {
      this.GetCostFactorLetterList();
    });

  }

  GetCostFactorLetterList() {
    this.Automation.GetCostFactorLetterList(this.CostFactorLetter)
      .subscribe(res => {
        this.LettersRowData = res;
      });
  }
  OnCheckBoxChange(event) {
    this.IsArchive = event;
  }

}
