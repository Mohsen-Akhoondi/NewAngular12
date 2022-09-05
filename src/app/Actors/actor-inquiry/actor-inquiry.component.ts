import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor-inquiry',
  templateUrl: './actor-inquiry.component.html',
  styleUrls: ['./actor-inquiry.component.css']
})
export class ActorInquiryComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  CorporateIdentityNo;
  PersonIdentityNo: string;
  BirthDate = null;
  FirstName;
  LastName;
  IsPerson = true;
  CorporateName: any;
  Validate = true;
  PersonObject: any;
  PostCodeSearch;
  CorporateObject: any;
  isClicked: boolean;
  PopUpType: string;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  ModuleCode;
  PopupParam;

  constructor(
    private Actor: ActorService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {

    if (!this.ModuleCode && this.InputParam && this.InputParam.ModuleCode) {
      this.ModuleCode = this.InputParam.ModuleCode;
    }
  }

  IsPersonRedioClick(Type) {
    this.IsPerson = Type;
    if (this.IsPerson) {
      this.CorporateName = '';
      this.CorporateIdentityNo = '';
    } else {
      this.FirstName = '';
      this.LastName = '';
      this.BirthDate = null;
      this.PersonIdentityNo = '';
    }
    this.PersonObject = null;
    this.CorporateObject = null;
    this.Validate = true;
  }

  onSearchClick() {
    if (!this.PostCodeSearch) {
      this.ShowMessageBoxWithOkBtn('کد پستی نمی تواند خالی باشد');
      return;
    }
    if (this.IsPerson && this.PersonIdentityNo && this.PersonIdentityNo.length < 10) {
      this.ShowMessageBoxWithOkBtn('کد ملی باید 10 رقم باشد');
    } else {

      const IdentityNo = this.IsPerson ? this.PersonIdentityNo : this.CorporateIdentityNo;
      this.BirthDate = this.BirthDate ? this.BirthDate : null;
      this.Actor.GetActorByIdentityNo(IdentityNo, this.BirthDate, this.IsPerson, this.PostCodeSearch).subscribe(res => {
        if (res) {
          this.Validate = res.Validate;
          if (this.IsPerson) {
            this.PersonObject = res;
            this.FirstName = res.FirstName;
            this.LastName = res.LastName;
            this.BirthDate = res.ShortBirthDate;
          } else if (!this.IsPerson) {
            this.CorporateObject = res;
            this.CorporateName = res.CorporateName;
          }
        }
      });
    }
  }

  OnBirthDateChange(ADate) {
    this.BirthDate = ADate.MDate;
  }
  onClose() {
    this.Closed.emit(true);
  }
  popupclosed(event) {

    this.isClicked = false;
    this.PopUpType = '';
  }

  onSave() {
    if (!this.Validate) {

      if (this.PersonObject) {
        this.PersonObject.BirthDate = this.PersonObject.ShortBirthDate;
        this.Actor.SavePerson(this.PersonObject, this.ModuleCode).subscribe(res => {
          this.PersonObject = res;
          this.Validate = this.PersonObject.Validate;
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        });
        return;
      }

      if (this.CorporateObject) {
        this.CorporateObject.RegisterDate = this.CorporateObject.ShortRegisterDate;
        this.Actor.SaveCorporate(this.CorporateObject, this.ModuleCode).subscribe(res => {
          this.CorporateObject = res;
          this.Validate = this.CorporateObject.Validate;
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        });
        return;
      }
    }
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
}
