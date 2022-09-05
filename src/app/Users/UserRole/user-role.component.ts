import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {
  private gridApiMenu: any;
  selectedFile: File;
  selectedDocumentID: number;
  selectedData: { DOCUMENT_ID: number; };
  colDefMenu: any;
  rowDataMenu: any;
  FirstName: any;
  LastName: any;
  LoginName: any;
  inputIdentityNo: any;
  UserID: any;
  ActorId: any;
  gridrows;
  startLeftPosition: number;
  startTopPosition: number;
  PixelWidth: number;
  type;
  itemNo = 0;
  HaveHeader;
  selectedFiles;
  UserImage: string;
  title = '';
  fileListlength;
  ImgLoadMsg = [];
  ImgLoadMsgSize = [];
  ImgLoadMsgType = [];
  ImgLoadMsgDimensions = [];
  ImageMsgLoded;
  img;
  VerifyCode = null;
  PhoneNumber;
  IsSendSMS = false;
  PhoneNumberVerifyCode = false;
  Cell;
  ChangeDetection = false;
  btnclicked = false;
  isClicked = true;
  IsDisable = true;
  IsUncorrect = false;
  IsEditable = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  UserLocalImage: string;
  private defaultColDef;
  private rowSelection;
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  IsDown = false;

  constructor(private router: Router,
    private UserDetails: UserSettingsService,
    private Service: ActorService,
    private CommonService: CommonServices,
    private ContractList: ContractListService
  ) {
    this.colDefMenu = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: 'نقش',
        field: 'RoleName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.ContractList.GetRolesList(false),
          bindLabelProp: 'RoleName',
          bindValueProp: 'RoleID'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RoleName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 450,
        resizable: true
      },
    ];
    this.defaultColDef = { resizable: true };
    this.rowSelection = 'single';
  }

  ngOnInit() {
    this.isClicked = true;
    this.UserDetails.CheckAdminForUserModule().subscribe(res => {
      this.IsDisable = !res;
    });
    this.rowDataMenu = [];
    $(document).ready(function () {
      $('.custom-file-input').on('change', function () {
        const fileName = $(this)
          .val()
          .split('\\')
          .pop();
        $(this)
          .next('.custom-file-label')
          .addClass('selected')
          .html(fileName);
      });
    });
    this.UserDetails.GetPersonDetails('').subscribe(res => {
      if (res != null) {
        this.inputIdentityNo = res.IdentityNo;
        this.FirstName = res.FirstName;
        this.LastName = res.LastName;
        this.LoginName = res.LoginName;
        this.ActorId = res.ActorId;
        this.UserID = res.UserID;
        this.PhoneNumber = res.PhoneNumber;
        this.UserImage = this.CommonService._arrayBufferToBase64(res.Image);
        this.rowDataMenu = res.Roles;
        this.isClicked = false;
        this.IsEditable = true;
      }
      this.IsDown = true;
    });
  }

  onGridReadyMenu(params: { api: any; }) {
    this.gridApiMenu = params.api;
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  onClick() {
    if (!this.inputIdentityNo || this.inputIdentityNo === null || this.inputIdentityNo === '') {
      this.ShowMessageBoxWithOkBtn('کد ملی وارد نشده است');
      return;
    }
    this.UserDetails.GetPersonDetails(this.inputIdentityNo).subscribe(res => {
      if (res != null) {
        this.FirstName = res.FirstName;
        this.LastName = res.LastName;
        this.LoginName = res.LoginName;
        this.ActorId = res.ActorId;
        this.UserID = res.UserID;
        this.PhoneNumber = res.PhoneNumber;
        this.UserImage = this.CommonService._arrayBufferToBase64(res.Image);
        this.rowDataMenu = res.Roles;
        this.isClicked = false;
        this.IsEditable = true;
        return;
      }

      this.ShowMessageBoxWithOkBtn('شخصی با این کد ملی در سامانه موجود نیست');
      this.FirstName = '';
      this.LastName = '';
      this.LoginName = '';
      this.ActorId = '';
      this.UserID = '';
      this.PhoneNumber = '';
      this.UserImage = '';
      this.rowDataMenu = of([]);
      this.isClicked = true;
      this.IsEditable = true;
    });
  }

  BtnSearchClick() {
    this.type = 'users-search';
    this.btnclicked = true;
    this.startLeftPosition = 150;
    this.startTopPosition = 50;
  }
  onAddRow() {
    this.itemNo++;
    const newItem = {
      ItemNo: this.itemNo
    };
    this.gridApiMenu.updateRowData({ add: [newItem] });
  }

  Search(IdentityNo) {
    this.UserDetails.GetPersonDetails(IdentityNo).subscribe(res => {
      if (res != null) {
        this.inputIdentityNo = res.IdentityNo;
        this.FirstName = res.FirstName;
        this.LastName = res.LastName;
        this.LoginName = res.LoginName;
        this.ActorId = res.ActorId;
        this.UserID = res.UserID;
        this.PhoneNumber = res.PhoneNumber;
        this.UserImage = this.CommonService._arrayBufferToBase64(res.Image);
        this.rowDataMenu = res.Roles;
        this.isClicked = false;
        this.IsEditable = true;
        return;
      }
      this.ShowMessageBoxWithOkBtn('شخصی با این کد ملی در سامانه موجود نیست');
      this.FirstName = '';
      this.LastName = '';
      this.LoginName = '';
      this.ActorId = '';
      this.UserID = '';
      this.PhoneNumber = '';
      this.UserImage = '';
      this.rowDataMenu = of([]);
      this.isClicked = true;
      this.IsEditable = true;
    });
  }
  onSave() {
    const rowData = [];
    const RoleList = [];
    if (this.ActorId === 0 || this.ActorId === '') {
      this.ShowMessageBoxWithOkBtn('اطلاعات شخص را وارد کنید');
      return;
    }
    if (this.IsSendSMS && !this.VerifyCode) {
      this.ShowMessageBoxWithOkBtn('کد تایید را وارد کنید ');
      return;
    }
    if (!this.LoginName || this.LoginName === null || this.LoginName === '') {
      this.ShowMessageBoxWithOkBtn('نام کاربری وارد نشده است');
      return;
    }
    if (this.fileListlength > 0 &&
      !(this.selectedFile.size < 100000
        && (this.selectedFile.type.split('/')[1] === 'png'
          || this.selectedFile.type.split('/')[1] === 'jpeg'
          || this.selectedFile.type.split('/')[1] === 'jpg'
          || this.selectedFile.type.split('/')[1] === 'bmp')
        && (this.img.width < 1024 || this.img.height < 1024))) {
      this.ShowMessageBoxWithOkBtn('امکان ذخیره سازی تصویر انتخاب شده وجود ندارد.');
      return;
    }

    if (!this.IsDisable) {
      this.gridApiMenu.stopEditing();
      if (this.gridApiMenu) {
        this.gridApiMenu.forEachNode(function (node) {
          rowData.push(node.data);
        });
        rowData.forEach((item) => {
          if (item.RoleID) {
            const obj = {
              RoleID: item.RoleID,
              RoleName: item.RoleName,
            };
            RoleList.push(obj);
          } else {
            const obj = {
              RoleID: item.RoleName.RoleID,
              RoleName: item.RoleName.RoleName,
            };
            RoleList.push(obj);
          }
        });
      }
    }

    const uploadData = new FormData();
    if (this.fileListlength > 0) {
      uploadData.append('AFile', this.selectedFile, this.selectedFile.name);
    }
    const zz = { pp: 12, cc: 23 };
    uploadData.append('TestObject', JSON.stringify(zz))
    uploadData.append('UserID', this.UserID.toString());
    uploadData.append('ActorId', this.ActorId);
    uploadData.append('LoginName', this.LoginName);
    uploadData.append('PhoneNumberVerifyCode', this.VerifyCode);
    for (let i = 0; i < RoleList.length; i++) {
      uploadData.append('listOfRole', RoleList[i].RoleID);
    }
    this.UserDetails.SaveUser(uploadData).subscribe(res => {
      if (res) {
        this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقیت انجام شد');
      } else {

        this.ShowMessageBoxWithOkBtn('رمز یکبارمصرف وارد شده صحیح نمی باشد');
      }
    },
      err => {
        if (!err.error.Message.includes('|')) { // RFC 52396
          this.ShowMessageBoxWithOkBtn('ثبت  با خطا مواجه شد لطفا مجددا اقدام به ثبت نمایید');
        }
      });
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  MessageBoxAction(ActionResult) {
    if (ActionResult === 'YES') {
      this.btnclicked = false;
    }
  }
  onCellValueChanged(event) {
    if (event.newValue && event.colDef && event.colDef.field === 'RoleName') {
      const itemsToUpdate = [];
      this.gridApiMenu.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.RoleID = event.newValue.RoleID;
          node.data.RoleName = event.newValue.RoleName;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApiMenu.updateRowData({ update: itemsToUpdate });
    }
  }
  popupclosed() {
    this.btnclicked = false;
  }
  close(): void {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  onFileChanged(event) {
    this.UserImage = '';
    this.UserLocalImage = '';
    this.ImgLoadMsgSize = [];
    this.ImgLoadMsgType = [];
    this.ImgLoadMsgDimensions = [];
    const fileList: FileList = event.target.files;
    this.fileListlength = fileList.length;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
      if (this.selectedFile.size > 100000) {
        this.ImgLoadMsgSize.push({ msg: '*حجم فایل بیش از حد مجاز است' });
        this.ImageMsgLoded = true;
        this.IsUncorrect = true;
      } else { this.IsUncorrect = false; }
      if (this.selectedFile.type.split('/')[1] !== 'png' && this.selectedFile.type.split('/')[1] !== 'jpeg'
        && this.selectedFile.type.split('/')[1] !== 'bmp' && this.selectedFile.type.split('/')[1] !== 'jpg') {
        this.ImgLoadMsgType.push({ msg: '*نوع فایل معتبر نیست' });
        this.ImageMsgLoded = true;
        this.IsUncorrect = true;
      } else { this.IsUncorrect = false; }
      const reader = new FileReader();
      reader.onload = e => {
        this.img = new Image();
        this.img.onload = () => {
          if (this.img.width > 1024 || this.img.height > 1024) {
            this.ImgLoadMsgDimensions.push({ msg: '*اندازه عکس معتبر نیست' });
            this.ImageMsgLoded = true;
            this.IsUncorrect = true;
          } else {
            this.UserLocalImage = this.img.src;
            this.IsUncorrect = false;
          }
        };
        this.img.src = reader.result.toString();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  DisposableBtnSMSClicked() {

    if (!this.PhoneNumber || isNaN(Number(this.PhoneNumber)) || this.PhoneNumber.length !== 11) {
      this.ShowMessageBoxWithOkBtn('لطفا شماره تلفن همراه را به صورت صحیح وارد نمایید');
      return;
    }

    this.Service.GetPhoneNumberVerifyCode(this.PhoneNumber).subscribe(res => this.IsSendSMS = res);
  }
}

