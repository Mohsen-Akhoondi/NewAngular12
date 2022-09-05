import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';

@Component({
  selector: 'app-accept-rules',
  templateUrl: './accept-rules.component.html',
  styleUrls: ['./accept-rules.component.css']
})
export class AcceptRulesComponent implements OnInit {
  @Output() AcceptRulesClosed: EventEmitter<any> = new EventEmitter<any>();
  @Input() InputParams;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  TypeName1 = '';
  TypeName2 = '';
  AcceptRule = false;
  ShowMessage = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  constructor() { }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    switch (this.InputParams.ENType) {
      case 'tender':
        this.TypeName1 = 'مناقصات';
        this.TypeName2 = 'مناقصه';
        break;
      case 'auction':
        this.TypeName1 = 'مزایدات';
        this.TypeName2 = 'مزاید';
        break;
      case 'search':
        this.TypeName1 = 'استعلام ها';
        this.TypeName2 = 'استعلام';
        break;
      case 'advertising':
        this.TypeName1 = 'حراج';
        this.TypeName2 = 'حراج';
        break;
      default:
        break;
    }
  }
  onAccept() {
    if (!this.AcceptRule) {
      this.ShowMessage = true;
      this.alertMessageParams.message = 'امکان دانلود اسناد بدون پذیرش قوانین وجود ندارد خواهمشند است ابتدا تیک موافق هستم را کلیک نمایید';
      return;
    }
    this.AcceptRulesClosed.emit(this.AcceptRule ? 'IsAccept' : 'IsNotAccept');
  }
  onCancel() {
    this.AcceptRulesClosed.emit('IsNotAccept');
  }
  OnCheckBoxChange(params) {
    this.AcceptRule = params;
  }
  popupclosed(event) {
    this.ShowMessage = false;
  }
}
