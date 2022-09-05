import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { isUndefined } from 'util';
import { RadioBoxModel } from '../Radio-Box-Model/RadioBoxModel';

@Component({
  selector: 'app-radio-box-component',
  templateUrl: './radio-box-component.component.html',
  styleUrls: ['./radio-box-component.component.css']
})
/* Important: Element Name (RadioBoxModel) Must Be Unique. */
/* Developed By: malikhan */
export class RadioBoxComponentComponent implements OnInit {

  @Input() Params: Array<RadioBoxModel>;
  @Input() Display: string;
  @Input() DefaultSelected: number;
  @Input() Title: string;
  @Input() Title_Width: number;
  @Input() Min_Height: number;
  @Input() Bordered: boolean;
  @Input() Disabled: boolean;
  @Input() Mode: string;
  @Input() TableAlign: boolean;
  @Input() QuestionStyle: boolean;
  @Output() SelectedOption: EventEmitter<any> = new EventEmitter<any>();
  @Input() BoxWidth: number;
  @Input() BoxAlign: string;
  @Input() CenterBox: boolean;
  List: Array<RadioBoxModel> = [];
  constructor() { }

  ngOnInit() {
    this.OnChange(this.DefaultSelected, true);
  }
  private OnChange(event, OverRide = false) {
    this.List = [];
    this.List = this.Params;
    if ((!this.Disabled) || OverRide) {
      const item = this.List.filter(x => x.Value === event);
      if (item.length === 1) {
        item[0].Checked = true;
        const DeselectList = this.List.filter(x => x.Value !== event && x.Checked);
        DeselectList.forEach(res => {
          res.Checked = false;
        });
        this.SelectedOption.emit(event);
      }
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.Params && changes.Params.currentValue) {
      this.Params = changes.Params.currentValue;
    }
    if (changes.DefaultSelected &&  !isUndefined(changes.DefaultSelected.currentValue)) {
      this.DefaultSelected = changes.DefaultSelected.currentValue;
      this.OnChange(this.DefaultSelected, true);
    }
  }
}

