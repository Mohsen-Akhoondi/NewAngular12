import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent implements OnInit {
  @Output() UsersSearchOutPutPram: EventEmitter<any> = new EventEmitter<any>();
  @Output() UsersSearchClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  private gridApi;
  colDef;
  userData: any;
  btnclicked;
  selectedRow: any;
  type: string;
  OverstartLeftPosition;
  OverstartTopPosition;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  startTopPosition: number;
  startLeftPosition: number;

  constructor(
    private router: Router,
    private Users: UserSettingsService
  ) {
    this.colDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'شناسه کاربر',
        field: 'UserID',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نام کاربری ',
        field: 'LoginName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نام/نام شرکت',
        field: 'FirstName',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نام خانوادگی',
        field: 'LastName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تارخ تولد',
        field: 'BirthDateString',
        width: 90,
        resizable: true
      },
      {
        headerName: 'کد ملی/شناسه ملی',
        field: 'IdentityNo',
        width: 110,
        resizable: true
      },
      {
        headerName: 'شماره همراه',
        field: 'PhoneNumber',
        width: 110,
        resizable: true
      },
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }
  ngOnInit() {
  this.getUser();
  }
  getUser() {
    this.userData = this.Users.GetUsers();
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }

 onRowDoubleClicked(event) {
  if (this.gridApi.getSelectedRows()) {
    this.UsersSearchOutPutPram.emit(this.gridApi.getSelectedRows()[0].IdentityNo);
  }
   this.UsersSearchClosed.emit(true);
}
BtnOkclick() {
  if (this.selectedRow == null) {
    this.type = 'message-box';
    this.HaveHeader = true;
    this.alertMessageParams.message = 'قراردادی جهت مشاهده انتخاب نشده است';
    this.btnclicked = true;
    this.startLeftPosition = 600;
    this.startTopPosition = 500;
  } else {
    this.UsersSearchOutPutPram.emit(this.gridApi.getSelectedRows()[0].IdentityNo);
    this.UsersSearchClosed.emit(true);
  }

}
popupclosed() {
  this.btnclicked = false;
}
  closeModal() {
    this.UsersSearchClosed.emit(true);
  }

}
