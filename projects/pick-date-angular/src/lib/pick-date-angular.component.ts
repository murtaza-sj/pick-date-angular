import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { HelperService } from './pick-date-angular.component.service';

@Component({
  selector: 'pick-date-angular',
  templateUrl: 'pick-date-angular.component.html',
  styleUrls: ['pick-date-angular.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class PickDateAngularComponent implements OnInit {
  @Output() handleOnChange = new EventEmitter();
  @Input() date: Date;
  @Input() config: any;
  @Input() theme: any;
  @Input() format: string;
  @Input() minDay: Date;
  @Input() maxDay: Date;
  @Input() isInputDisabled: Boolean;

  value: Date = new Date();
  showCalendar: Boolean = false;

  constructor(
    private _helperService: HelperService,
    private _eref: ElementRef
  ) {}

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.showCalendar = false;
    }
  }

  ngOnInit() {
    this.value = this.date;
  }

  handleOnClick() {
    this.showCalendar = true;
  }

  setConfig = () => {
    let currentFormat: string, regex: RegExp, separator: string;
    if (this.config) {
      currentFormat = this.config.format || 'mm/dd/yyyy';
      regex =
        this.config.regex ||
        this._helperService.dateFormats[currentFormat].regex;
      separator = this.config.separator || '/';
    } else {
      currentFormat = this._helperService.dateFormats[this.format]
        ? this.format
        : 'mm/dd/yyyy';
      regex = this._helperService.dateFormats[currentFormat].regex;
      separator = this._helperService.dateFormats[currentFormat].separator;
    }
    return { currentFormat, regex, separator };
  };

  handleOnInputChange = (e) => {
    const { currentFormat, regex, separator } = this.setConfig();
    const minDayPresent = this._helperService.checkIfDateObject(this.minDay);
    const maxDayPresent = this._helperService.checkIfDateObject(this.maxDay);
    const date = new Date(
      this._helperService.ISOFormat(e, currentFormat, separator)
    );
    if (
      !regex.test(e) ||
      (maxDayPresent && date.getTime() > this.maxDay.getTime()) ||
      (minDayPresent && date.getTime() < this.minDay.getTime())
    ) {
      this.handleOnChange.emit(false);
    } else {
      this.handleOnChange.emit(date);
      this.value = date;
    }
  };

  changeInputValue = (object: any) => {
    this.value = object.date;
    this.showCalendar = object.nextOrPrevious;
  };

  onFormat = (date) => {
    const { currentFormat, regex, separator } = this.setConfig();
    const splitDate = date.toString().split(' ');
    const formattedDate = this._helperService.formatDate(
      splitDate,
      currentFormat,
      separator
    );
    return formattedDate;
  };
}
