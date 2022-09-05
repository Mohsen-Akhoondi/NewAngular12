import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';

@Component({
  selector: 'app-consult-person',
  templateUrl: './consult-person.component.html',
  styleUrls: ['./consult-person.component.css']
})
export class ConsultPersonComponent implements OnInit {
  inputIdentityNo;
  FirstName: string;
  LastName: string;
  PersianBirthDate: string;
  EducationYear;
  ExperienceYear;
  ManagementCoef;
  TopGraduated;
  btnclicked = false;
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  type;
  HaveHeader;
  isClicked = true;
  ModuleCode;
  HaveSave = false;
  HaveDelete = false;
  PersonID: number;
  ConsultPersonList = [];

  constructor(private router: Router,
              private Actor: ActorService,
              private route: ActivatedRoute,
              private User: UserSettingsService) {
                this.route.params.subscribe(params => {
                  this.ModuleCode = +params['ModuleCode'];
                });
               }

  ngOnInit() {
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      this.HaveSave = false;
      this.HaveDelete = false;
      res.forEach(node => {
        switch (node.OperationCode) {
          case 7:
            this.HaveSave = true;
            break;
          case 6:
            this.HaveDelete = true;
            break;
          default:
            break;
        }
      });

    });
  }
  onClick() {
    if (!this.inputIdentityNo || this.inputIdentityNo === null || this.inputIdentityNo === ' ') {
      this.ShowMessageBoxWithOkBtn('کد ملی وارد نشده است.');
      return;
    }
    if (this.inputIdentityNo.toString().length  < 10) {
      this.ShowMessageBoxWithOkBtn('تعداد ارقام وارد شده کمتر از ده رقم است.');
      return;
    }
    this.Actor.GetConsultPersonDetails(this.inputIdentityNo).subscribe(res => {
      if (res != null && res.length > 0) {
        this.FirstName = res[0].FirstName;
        this.LastName = res[0].LastName;
        this.PersianBirthDate = res[0].PersianBirthDate;
        this.EducationYear = res[0].EducationYear;
        this.ExperienceYear = res[0].ExperienceYear;
        this.ManagementCoef = res[0].ManagementCoef;
        this.TopGraduated = res[0].TopGraduated;
        this.PersonID = res[0].PersonID;
        this.isClicked = false;
        return;
      }

      this.ShowMessageBoxWithOkBtn('شخصی با این کد ملی در سامانه موجود نیست.');
      this.FirstName = '';
      this.LastName = '';
      this.PersianBirthDate = '';
      this.EducationYear = '';
      this.ExperienceYear = '';
      this.ManagementCoef = '';
      this.TopGraduated = '';
      this.isClicked = true;
    });
}

  getEducationYear(EducationYear) {
    if (EducationYear) { this.EducationYear = EducationYear;
      this.EducationYear = parseFloat(this.EducationYear);
    } else {
      this.EducationYear = '';
    }
  }

  getExperienceYear(ExperienceYear) {
    if (ExperienceYear) {
      this.ExperienceYear = ExperienceYear;
      this.ExperienceYear = parseFloat(this.ExperienceYear);
    } else {
      this.ExperienceYear = '';
    }
  }

  getManagementCoef(ManagementCoef) {
    if (ManagementCoef) {
      this.ManagementCoef = ManagementCoef;
      this.ManagementCoef = parseFloat(this.ManagementCoef);
    } else {
      this.ManagementCoef = '';
    }
  }

  getTopGraduated(TopGraduated) {
    if (TopGraduated) {
      this.TopGraduated = TopGraduated;
      this.TopGraduated = parseFloat(this.TopGraduated);
    } else {
      this.TopGraduated = '';
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 150;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  popupclosed() {
    this.btnclicked = false;
  }

  onSave() {
    this.ConsultPersonList = [{PersonID: this.PersonID,
      EducationYear: this.EducationYear,
      ExperienceYear: this.ExperienceYear,
      ManagementCoef: this.ManagementCoef,
      TopGraduated: this.TopGraduated}];
    this.Actor.SaveConsultPersonDetaile(this.ConsultPersonList).subscribe(
      res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد.');
      },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با مشکل مواجه شد.');
      }
    );
  }

  onClose() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
}

}
