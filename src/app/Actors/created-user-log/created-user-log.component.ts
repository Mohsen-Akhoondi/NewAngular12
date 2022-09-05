import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-created-user-log',
  templateUrl: './created-user-log.component.html',
  styleUrls: ['./created-user-log.component.css']
})
export class CreatedUserLogComponent implements OnInit {
  @Output() UsersSearchClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  private gridApi;
  colDef;
  userData;
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
    private UserSetting: UserSettingsService
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
        width: 120,
        resizable: true
      },
      {
        headerName: 'نام',
        field: 'FirstName',
        width: 100,
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
        width: 110,
        resizable: true
      },
      {
        headerName: 'کد ملی/شناسه ملی',
        field: 'IdentityNo',
        width: 160,
        resizable: true
      },
    ];
  }

  // onGridReady(params) {
  //   this.gridApi = params.api;
  // }
  ngOnInit() {
  this.getUser();
  }
  getUser() {
    this.userData = this.UserSetting.CreatedUserList();
  }
popupclosed() {
  this.btnclicked = false;
}
  closeModal() {
    this.UsersSearchClosed.emit(true);
  }

}

