import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  Injectable
} from '@angular/core';
import * as moment from 'jalali-moment';
import { IDatePickerConfig, ECalendarValue } from '../jalali-angular-datepicker';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-jalali-datepicker',
  templateUrl: './jalali-datepicker.component.html',
  styleUrls: ['./jalali-datepicker.component.css']
})
@Injectable()
export class JalaliDatepickerComponent implements ICellEditorAngularComp, OnInit {

  // ----------------------------------------
  @Input() Required = false;
  @Input() CheckValidate = false;
  @Input() WidthPx;
  @Input() WidthPC;
  @Input() ShowMode = 'day';
  @Input() AppendTo;
  @Input() CurrShamsiDateValue;
  @Input() CurrMiladiDateValue;
  @Input() Disabled = false;
  @Output() Change: EventEmitter<any> = new EventEmitter<any>();
  selectedDate;
  @Input() DateFormat = 'YYYY/MM/DD';
  @Input() Clearable = true;
  ChangesObj = { FullDate: '', SDate: '', MDate: null };
  BeforeChangesObj;

  @ViewChild('datePickerModel') datePickerModel: TemplateRef<any>;
  constructor() { }
  jalaliConfigExtension: IDatePickerConfig = {
    firstDayOfWeek: 'sa',
    monthFormat: 'MMMM YY',
    weekDayFormat: 'dd',
    dayBtnFormat: 'D',
    monthBtnFormat: 'MMMM',
    format: this.DateFormat,
    locale: 'fa'
  };
  gregorianSystemDefaults: IDatePickerConfig = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    openOnFocus: true,
    openOnClick: true,
    onOpenDelay: 0,
    weekDayFormat: 'ddd',
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM',
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: false,
    timeSeparator: ':',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    locale: 'fa',
    hideInputContainer: false,
    returnedValueType: ECalendarValue.Moment,
    unSelectOnClick: true,
    hideOnOutsideClick: true
  };
  config: IDatePickerConfig = { ...this.gregorianSystemDefaults, ...this.jalaliConfigExtension };
  ngOnInit() {
    if (this.AppendTo) {
      this.config.appendTo = this.AppendTo;
    }
    if (this.CurrShamsiDateValue) {
      // alert(moment.from('1367/11/04', 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD'));
      // alert(moment('1989/01/24', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
      const MomentDate = moment.from(this.CurrShamsiDateValue, 'fa', this.DateFormat).format(this.DateFormat);
      this.selectedDate = MomentDate;
    }
    if (this.CurrMiladiDateValue) {
      const MomentDate = moment.from(this.CurrMiladiDateValue, 'en', this.DateFormat).format(this.DateFormat);
      this.selectedDate = MomentDate;
    }
  }
  OnChange(changes) {
    if (changes) {
      this.ChangesObj.FullDate = changes._d;
      this.ChangesObj.SDate = moment(changes._d).locale('fa').format(this.DateFormat);
      this.ChangesObj.MDate = moment(changes._d).locale('en').format(this.DateFormat);
      this.BeforeChangesObj = this.ChangesObj;
      this.Change.emit(this.ChangesObj);
    } else if (!this.Clearable) {
      if (this.BeforeChangesObj) {
        this.selectedDate = moment.from(this.BeforeChangesObj.MDate, 'en', this.DateFormat).format(this.DateFormat);
        this.Change.emit(this.BeforeChangesObj);
      }
    } else {
      this.ChangesObj = { FullDate: '', SDate: '', MDate: null };
      this.Change.emit(this.ChangesObj);
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    if (changes.CurrShamsiDateValue && changes.CurrShamsiDateValue.currentValue) {
      const MomentDate = moment.from(changes.CurrShamsiDateValue.currentValue, 'fa', this.DateFormat).format(this.DateFormat);
      this.selectedDate = MomentDate;
    }
    if (changes.CurrMiladiDateValue && changes.CurrMiladiDateValue.currentValue) {
      const MomentDate = moment.from(this.CurrMiladiDateValue, 'en', this.DateFormat).format(this.DateFormat);
      this.selectedDate = MomentDate;
    }
    if (changes.ShowMode && changes.ShowMode.currentValue) {
      this.ShowMode = changes.ShowMode.currentValue;
    }
    if (changes.DateFormat && changes.DateFormat.currentValue) {
      this.DateFormat = changes.DateFormat.currentValue;
      this.config.format = changes.DateFormat.currentValue;
    }
    if (changes.CurrMiladiDateValue && !changes.CurrMiladiDateValue.currentValue) {
      this.selectedDate = null;
    }
  }

  // -------------------------------------

  isPopup?(): boolean {
    return false;
  }
  isCancelBeforeStart?(): boolean {
    return false;
  }
  isCancelAfterEnd?(): boolean {
    return false;
  }
  focusIn?(): void {
  }
  focusOut?(): void {
  }

  getValue() {
    if (this.ChangesObj) {
      return this.ChangesObj;
    } else {
      return '';
    }
  }

  agInit(params): void {
    if (params.DateFormat) {
      this.DateFormat = params.DateFormat;
      this.config.format = params.DateFormat;
    }
    if (params.WidthPC) {
      this.WidthPC = params.WidthPC;
    }
    if (params.ShowMode) {
      this.ShowMode = params.ShowMode;
    }

    if (params.value) {
      const currentValue = params.value.SDate ? params.value.SDate : params.value;
      const MomentDate = moment.from(currentValue, 'fa', this.DateFormat).format(this.DateFormat);
      this.selectedDate = MomentDate;
    }

    if (params.AppendTo) {
      this.config.appendTo = params.AppendTo;
    }

  }
  afterGuiAttached?(params): void {
  }

}
