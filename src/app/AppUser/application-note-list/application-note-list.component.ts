import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';

@Component({
  selector: 'app-application-note-list',
  templateUrl: './application-note-list.component.html',
  styleUrls: ['./application-note-list.component.css']
})
export class ApplicationNoteListComponent implements OnInit {
  ModuleItems;
  ModuleParams = {
    bindLabelProp: 'ModuleName',
    bindValueProp: 'ModuleCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  IsWeb=true;
  BoxDevHeight = 84;
  columnDef;

  rowSelection: string;
  FromApplicationNoteDate: any;
  OnFromApplicationNoteDate: any;
  ToApplicationNoteDate: any;
  Note: any;
  rowData: any = [];
  gridApi: any;
  HasModule=true;
  SelectedModuleObject: any;
  selectedRow: any;
  type: string;
  HaveHeader: boolean;
  btnclicked: boolean;
  HaveMaxBtn: boolean;
  HeightPercentWithMaxBtn: number;
  PercentWidth: number;
  MainMaxwidthPixel: number;
  MinHeightPixel: number;
  startLeftPosition: number;
  startTopPosition: number;
  paramObj;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
 
  ModuleCode: any;
  ApplicationNoteID:any;
  BtnClickedName: string;
  PopUpType: string;


  
  constructor(
    private AddModule: ModuleService,
    private router: Router,
  ) {
    this.columnDef = [
      {

         
            headerName: 'ردیف ',
            field: 'ItemNo',
            width: 80,
            resizable: true
          },
          {
            headerName: 'تاریخ اعمال',
            field: 'PersianHistoryDate',
            width:130,
            resizable: true,
            sortable: true,
          },
          {
            headerName: 'تاریخ نمایش از',
            field: 'FromDatePersian',
            width: 130,
            resizable: true,
            sortable: true,
          },
          {
            headerName: 'تا',
            field: 'ToDatePersian',
            width: 130,
            resizable: true
          },
          {
            headerName: 'توضیحات',
            field: 'Note',
            width: 550,
            resizable: true
          },
        ]


   }

   RowClick(event) {
    this.selectedRow = event.data;
   }
  onChangeModuleObj(newObj) {
    this.ModuleParams.selectedObject = newObj;
    this.GetApplicationNoteListData(this.ModuleParams.selectedObject);
    this.SelectedModuleObject = this.ModuleItems.find(x => x.ModuleCode === this.ModuleParams.selectedObject);
    this.selectedRow = null;
    
  }
  ngOnInit() {
    this.getNewData();

  }
  
  getNewData(): void {
    this.AddModule.GetModule(this.IsWeb==true).subscribe(res => {
       this.ModuleItems = res;
       this.HasModule = res.length > 0;
     if (this.HasModule) {
       this.ModuleItems = res;
       this.ModuleParams.selectedObject = res[0].ModuleCode;
        this.GetApplicationNoteListData(this.ModuleParams.selectedObject);
       this.SelectedModuleObject = this.ModuleItems.find(x => x.ModuleCode === this.ModuleParams.selectedObject);
      
       }
    });

  }
  GetApplicationNoteListData(ModuleCode): void {
    this.rowData = of([]);
    this.rowData = this.AddModule.GetApplicationNoteListData(ModuleCode) 


      this.AddModule.GetApplicationNoteListData(ModuleCode).subscribe((res: any) => {
        this.rowData = res;
   
      });

  }
  Btnclick(BtnName) {
    if (BtnName === 'insert') {
      this.type = 'application-note-form';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 486;
      this.startTopPosition = 211;
      this.MainMaxwidthPixel = 1285;
       this.MinHeightPixel = 380;
       this.startTopPosition = 10;
       this.HaveMaxBtn = true;
       this.HeightPercentWithMaxBtn =70;
       this.PercentWidth = 95;
  
       this.paramObj = {

        Mode: 'InsertMode',
      };
 
    }
    
    if (BtnName === 'update') {
      if (this.selectedRow == null) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = ' ردیفی جهت مشاهده انتخاب نشده است';
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.startLeftPosition = 500;
        this.startTopPosition = 250;
        this.MinHeightPixel = null;
        return;
      }else{
      this.type = 'application-note-form';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 486;
      this.startTopPosition = 211;
      this.MainMaxwidthPixel = 1285;
       this.MinHeightPixel = 380;
       this.startTopPosition = 10;
       this.HaveMaxBtn = true;
       this.HeightPercentWithMaxBtn = 70;
       this.PercentWidth = 95;
      this.paramObj = {
        ApplicationNoteID: this.selectedRow.ApplicationNoteID,
        HistoryDate:this.selectedRow.PersianHistoryDate,
        FromDate:this.selectedRow.FromDatePersian,
        ToDate:this.selectedRow.ToDatePersian,
      
        Mode: 'EditMode',
      };
  
    }
    }


}


ShowMessageBoxWithYesNoBtn(message) {
  this.btnclicked = true;
  this.type = 'message-box';
  this.HaveHeader = true;
  this.HaveMaxBtn = false;
  this.startLeftPosition = 449;
  this.startTopPosition = 87;
  this.alertMessageParams.message = message;
  this.alertMessageParams.HaveOkBtn = false;
  this.alertMessageParams.HaveYesBtn = true;
  this.alertMessageParams.HaveNoBtn = true;
}


MessageBoxAction(ActionResult) {
  if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
    this.DoDelete();
  } 
  this.type = '';
  this.BtnClickedName = '';
  this.btnclicked = false;
}

onDeleteclick() {
  if (this.selectedRow.ApplicationNoteID) {
    this.ShowMessageBoxWithYesNoBtn('آیا از حذف مطمئن هستید؟');
    this.BtnClickedName = 'BtnDelete';
  } else {
    this.ShowMessageBoxWithYesNoBtn('ردیفی جهت حذف انتخاب نشده است');
    return;
  }
}
DoDelete() {
  this.AddModule.DeleteApplicationNote(this.selectedRow.ApplicationNoteID).subscribe(
    res => {
      if (res === true) {
        this.rowData =this.AddModule.GetApplicationNote(this.selectedRow.ApplicationNoteID)
       this.ngOnInit();
        this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
      } else {
        this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
      }
    });
  
  }


Close() {
  this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
}

popupclosed() {
  this.btnclicked = false;
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



}