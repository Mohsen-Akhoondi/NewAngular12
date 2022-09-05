import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { isUndefined } from 'util';

@Component({
  selector: 'app-external-user-detail',
  templateUrl: './external-user-detail.component.html',
  styleUrls: ['./external-user-detail.component.css']
})
export class ExternalUserDetailComponent implements OnInit {
  UserName = '';
  MaincolumnDef;
  rowData = [];
  isClicked = false;
  PopUpType: string;
  startLeftPosition: number;
  startTopPosition: number;
  alertMessageParams = { HaveOkBtn: true, HaveYesBtn: false, HaveNoBtn: false, message: '', IsMultiLine: false };
  HaveMaxBtn = false;
  private gridApi;
  ModuleCode;
  HaveHeader: boolean;
  NationalCode = '';

  constructor(private router: Router,
    private Actor: ActorService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

    this.MaincolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'نام کاربری',
        field: 'username',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'کد / شناسه ملی',
        field: 'nationalCode',
        width: 110,
        resizable: true,
      },
      {
        headerName: 'نام',
        field: 'firstName',
        width: 120,
        resizable: true,
      },
      {
        headerName: 'نام خانوادگی',
        field: 'lastName',
        width: 120,
        resizable: true,
      },
      {
        headerName: 'تلفن همراه',
        field: 'mobile',
        width: 120,
        resizable: true,
      },
      {
        headerName: 'پست الکترونیک',
        field: 'email',
        width: 150,
        resizable: true,
      },
    ];
  }

  ngOnInit() {
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  onSearchUserDeails() {
    if ((!this.UserName || isUndefined(this.UserName) || this.UserName === '' || this.UserName === ' ')
      && (!this.NationalCode || isUndefined(this.NationalCode) || this.NationalCode === '' || this.NationalCode === ' ')) {
      this.ShowMessageBoxWithOkBtn('برای جستجو، یکی از فیلدها باید پر باشد.');
      return;
    } else if (this.UserName && this.NationalCode) {
      this.ShowMessageBoxWithOkBtn('برای جستجو، تنها یکی از فیلدها باید پر باشد.');
      return;
    } else {
      this.Actor.FindExternalUserDeails(this.UserName, this.NationalCode).subscribe(res => {
        if (res) {
          res.forEach(item => {
            if (item.type === '1') { // شخص حقیقی
              this.MaincolumnDef = [
                {
                  headerName: 'ردیف',
                  field: 'ItemNo',
                  width: 50,
                  resizable: true,
                },
                {
                  headerName: 'نام کاربری',
                  field: 'username',
                  width: 100,
                  resizable: true,
                },
                {
                  headerName: 'کد ملی',
                  field: 'nationalCode',
                  width: 110,
                  resizable: true,
                },
                {
                  headerName: 'نام',
                  field: 'firstName',
                  width: 100,
                  resizable: true,
                },
                {
                  headerName: 'نام خانوادگی',
                  field: 'lastName',
                  width: 110,
                  resizable: true,
                },
                {
                  headerName: 'تلفن همراه',
                  field: 'mobile',
                  width: 110,
                  resizable: true,
                },
                {
                  headerName: 'پست الکترونیک',
                  field: 'email',
                  width: 200,
                  resizable: true,
                },
              ];
            } else {
              this.MaincolumnDef = [
                {
                  headerName: 'ردیف',
                  field: 'ItemNo',
                  width: 50,
                  resizable: true,
                },
                {
                  headerName: 'نام کاربری',
                  field: 'username',
                  width: 100,
                  resizable: true,
                },
                {
                  headerName: 'شناسه ملی',
                  field: 'nationalCode',
                  width: 110,
                  resizable: true,
                },
                {
                  headerName: 'نام',
                  field: 'name',
                  width: 120,
                  resizable: true,
                },
                {
                  headerName: 'تلفن همراه',
                  field: 'mobile',
                  width: 120,
                  resizable: true,
                },
                {
                  headerName: 'پست الکترونیک',
                  field: 'email',
                  width: 200,
                  resizable: true,
                },
              ];
            }
          });
          this.rowData = res;
        } else {
          this.ShowMessageBoxWithOkBtn('نتیجه ای یافت نشد.');
          this.rowData = [];
        }
      });
    }
  }

  onClose() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  popupclosed() {
    this.isClicked = false;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 150;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }
}
