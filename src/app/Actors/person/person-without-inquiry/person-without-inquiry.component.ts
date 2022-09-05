import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';

@Component({
  selector: 'app-person-without-inquiry',
  templateUrl: './person-without-inquiry.component.html',
  styleUrls: ['./person-without-inquiry.component.css']
})
export class PersonWithoutInquiryComponent implements OnInit {
  PopupParam;
  CurrentPersonID;
  BirthDateSearch: any;
  IdentityNoSearch: string;
  PostCodeSearch: any;
  Validate = true;
  ActorId = 0;
  FirstName: any;
  LastName: any;
  PersonObject: any;
  Nationality: any;
  PassportNo: any;
  PersonelCode: any;
  FatherName: any;
  BirthCertificateNo: any;
  BirthPlace: any;
  Gender: any;
  Address: any;
  Tel: any;
  Cell: any;
  Email: any;
  Web: any;
  PostCode: any;
  RegionCode: any;
  RegionName: any;
  IsMale: boolean;
  IsFemale: boolean;
  IsEditable = true;
  ModuleCode;
  ActorName ;


  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  CheckValidate = false;
  isClicked: boolean;
  PopUpType: string;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  IdentityNo: any;
  BirthDate: any;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  IsValid: boolean;


  constructor(private Actor: ActorService,
    private User: UserSettingsService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 50;

 
  }

  OnBirthDateChange(ADate) {
    this.BirthDateSearch = ADate.MDate;
  }

  RedioClick(data) {
    this.Gender = data == false ? 0 :  1
  }
  OnCheckBoxChange(event) {
    this.IsValid = event;
  }
  onSave() { 

    const PersonObject = {
      ActorId :this.ActorId,
      FirstName   : this.FirstName,
      LastName    : this.LastName,
      BirthDate   : this.BirthDateSearch,
      IdentityNo  : this.IdentityNo,
      Nationality : this.Nationality ,
      FatherName  : this.FatherName,
      BirthCertificateNo : this. BirthCertificateNo,
      BirthPlace : this.BirthPlace ,
      Tel  : this.Tel,
      Cell : this.Cell,
      Email: this.Email,
      PersonelCode : this.PersonelCode,
      PassportNo : this.PassportNo,
      PostCode : this.PostCode,
      Address  : this.Address ,
      Web : this.Web,
      RegionName :this.RegionName,
      Gender : this.Gender

    };
        if (this.ActorId > 0) {
          this.Actor.UpdateActorPerson(PersonObject, this.ModuleCode).subscribe(res => {
            this.PersonObject = res;
            this.Validate = this.PersonObject.Validate;
            this.ShowMessageBoxWithOkBtn('ویرایش اطلاعات با موفقیت انجام شد');
          });
        } else {
          this.Actor.SaveActorPerson(PersonObject , this.ModuleCode).subscribe(res => {
            this.PersonObject = res;
            this.Validate = this.PersonObject.Validate;
            this.ActorId = this.PersonObject.ActorId;
            this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقیت انجام شد');
          });
        }
  }

  onClose() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  popupclosed(event) {
    this.isClicked = false;
    this.PopUpType = '';
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }


  onPersonDocArchiveClick() {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.PopupParam = {
      EntityID: this.ActorId,
      TypeCodeStr: '476-', 
      DocTypeCode: 476, 
      ModuleCode: 2784,
      IsReadOnly: !this.IsEditable
    };
  }
}
