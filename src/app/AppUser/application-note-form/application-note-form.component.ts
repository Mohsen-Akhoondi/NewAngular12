import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ModuleService } from 'src/app/Services/BaseService/ModuleService';

@Component({
  selector: 'app-application-note-form',
  templateUrl: './application-note-form.component.html',
  styleUrls: ['./application-note-form.component.css']
})
export class ApplicationNoteFormComponent implements OnInit {
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Input() InputParam;
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();


  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HaveHeader: boolean;
  btnclicked: boolean;
  type: string;
  OnFromApplicationNoteDate: any;
  Note: any;
  startLeftPosition: number;
  startTopPosition: number;
  PixelWidth: any;
  PixelHeight: any;
  HeightPercentWithMaxBtn: any;
  PopUpType: string;
  ModuleCode: any;
  FromDatePersian: any;
  HistoryDate: any;
  FromDate: any;
  ToDate: any;
  ApplicationNoteID: any;

  constructor(
    private AddModule: ModuleService,
    private router: Router,
  ) { }

  ModuleItems;
  ModuleParams = {
    bindLabelProp: 'ModuleName',
    bindValueProp: 'ModuleCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  FromApplicationNoteDate;
  ToApplicationNoteDate;
  IsWeb = true;
  ngOnInit() {
    this.OnOpenNgSelect('Module');

    if (this.InputParam && this.InputParam.Mode === 'EditMode' && this.InputParam.ApplicationNoteID) {
      this.AddModule.GetApplicationNote(this.InputParam.ApplicationNoteID).subscribe((res: any) => {

        this.ModuleParams.selectedObject = res.ModuleCode;

        this.HistoryDate = res.ShortHistoryDate;
        this.FromDate = res.ShortFromDate;
        this.ToDate = res.shortToDate;
        this.Note = res.Note;

        this.OutPutParam.emit(true);
      });
    }
  }

  OnOpenNgSelect(type) {
    switch (type) {
      case 'Module':
        {
          this.AddModule.GetModule(this.IsWeb == true).subscribe(res => {
            this.ModuleItems = res;
          });
        }
        break;

    }
  }

  HistoryDateChange(ADate) {
    this.HistoryDate = ADate.MDate;
  }
  FromDateChange(ADate) {
    this.FromDate = ADate.MDate;
  }
  ToDateChange(ADate) {
    this.ToDate = ADate.MDate;
  }


  onSave() {
    const ApplicationNote =
    {
      ApplicationNoteID: this.ApplicationNoteID,
      ModuleCode: this.ModuleParams.selectedObject,
      HistoryDate: this.HistoryDate,
      FromDate: this.FromDate,
      ToDate: this.ToDate,
      Note: this.Note,
      IsActiveWeb: true,
      IsActive: false

    }

    if (this.InputParam.Mode === 'InsertMode') {

      this.AddModule.SaveApplicationNote(ApplicationNote).subscribe((res: any) => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.OutPutParam.emit(true);
      });
     
    }


    if (this.InputParam.Mode === 'EditMode') {

    this.AddModule.UpdateApplicationNote(ApplicationNote,this.InputParam.ApplicationNoteID).subscribe((res: any) => {
     
      this.ShowMessageBoxWithOkBtn('اصلاح با موفقیت انجام شد');
      this.OutPutParam.emit(true);
    });
    
}

  }
  
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopUpType = 'message-box';
    this.startTopPosition = 182;
    this.startLeftPosition = 557;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  closeModal() {
    this.Closed.emit(true);
   
  }

  popupclosed() {
    this.btnclicked = false;
  }
 

  getOutPutParam(event) {

  }


}




