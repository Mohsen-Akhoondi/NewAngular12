import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomCheckBoxModel } from '../../custom-checkbox/src/public_api';
import { isUndefined } from 'util';


@Component({
  selector: 'app-custom-check-box',
  templateUrl: './custom-check-box.component.html',
  styleUrls: ['./custom-check-box.component.css']
})
export class CustomCheckBoxComponent implements OnInit {
  @Input() configurationInfo: CustomCheckBoxModel = new CustomCheckBoxModel();
  @Output() PrettyCheckBoxChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() isSelected = false;
  @Input() Disabled = false;
  constructor() { }

  ngOnInit() {
    if (!this.configurationInfo.styleCheckBox) {
      this.configurationInfo.icon = 'fa fa-check';
      this.configurationInfo.styleCheckBox = 'pretty p-icon p-round p-jelly p-round';
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.Disabled.currentValue)) {
      this.Disabled = changes.Disabled.currentValue;
    }
  }
  OnNGXCheckBoxChange(event) {
    this.PrettyCheckBoxChange.emit(event);
  }
}
