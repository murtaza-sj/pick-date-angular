import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { HelperService } from '../pick-date-angular.component.service';

@Component({
  selector: 'pick-calendar-angular',
  templateUrl: 'pick-calendar-angular.component.html',
  styleUrls: ['pick-calendar-angular.component.css'],
})
export class PickCalendarAngularComponent implements OnInit, OnChanges {
  @Input() date: Date;
  @Input() theme: any;
  @Input() minDay: Date;
  @Input() maxDay: Date;
  @Output() handleOnChange = new EventEmitter();
  @Output() changeInputValue = new EventEmitter();

  backgroundColor: string = 'cornflowerblue';
  hoverColor: string = '#c5daff';

  showNext = true;
  showPrevious = true;

  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  daysOfMonth;
  day;
  month;
  year;
  selectedDay;
  minDayPresent;
  maxDayPresent;

  rows = [];
  columns = [];

  constructor(private _helperService: HelperService) {}

  ngOnInit() {
    this.backgroundColor =
      (this.theme && this.theme.backgroundColor) || this.backgroundColor;
    this.hoverColor = (this.theme && this.theme.hoverColor) || this.hoverColor;
    this.createCalendar();
  }

  ngOnChanges(changes: SimpleChanges) {
    let currentDate = new Date();
    if (this._helperService.checkIfDateObject(changes.date.currentValue)) {
      currentDate = changes.date.currentValue;
    }
    this.daysOfMonth = this._helperService.getDaysOfMonth(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    this.day = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth()
    ).getDay();
    this.month = currentDate.getMonth();
    this.year = currentDate.getFullYear();
    this.selectedDay = currentDate.getDate();
    this.checkMinMaxDates();
    this.createCalendar();
  }

  checkMinMaxDates = () => {
    this.minDayPresent = this._helperService.checkIfDateObject(this.minDay);
    this.maxDayPresent = this._helperService.checkIfDateObject(this.maxDay);
    if (this.minDayPresent) {
      this.showPrevious =
        new Date(`${this.month + 1} 1 ${this.year}`).getTime() >
        this.minDay.getTime();
    }
    if (this.maxDayPresent) {
      this.showNext =
        new Date(
          `${this.month + 1} ${this.daysOfMonth} ${this.year}`
        ).getTime() < this.maxDay.getTime();
    }
  };

  setDateState = (month, year) => {
    let date: Date;
    if (month !== new Date(year, month, this.selectedDay).getMonth()) {
      date = new Date(
        year,
        month,
        this._helperService.getDaysOfMonth(year, month + 1)
      );
    } else {
      date = new Date(year, month, this.selectedDay);
    }
    this.daysOfMonth = this._helperService.getDaysOfMonth(year, month + 1);
    this.day = new Date(year, month).getDay();
    this.selectedDay = date.getDate();
    this.month = month;
    this.year = year;
    this.handleOnChange.emit(date);
    this.changeInputValue.emit({ date, nextOrPrevious: true });
    this.createCalendar();
  };

  next = () => {
    const nextMonth = (this.month + 1) % 12;
    const nextYear = nextMonth === 0 ? this.year + 1 : this.year;
    this.setDateState(nextMonth, nextYear);
    if (
      this.maxDayPresent &&
      new Date(nextYear, nextMonth, this.selectedDay).getTime() >=
        this.maxDay.getTime()
    ) {
      this.selectedDay = this.maxDay.getDate();
    }
  };

  previous = () => {
    const previousMonth = (this.month + 11) % 12;
    const previousYear = previousMonth === 11 ? this.year - 1 : this.year;
    this.setDateState(previousMonth, previousYear);
    if (
      this.minDayPresent &&
      new Date(previousYear, previousMonth, this.selectedDay).getTime() <
        this.minDay.getTime()
    ) {
      this.selectedDay = this.minDay.getDate();
    }
  };

  handleOnClick = (date) => {
    this.changeInputValue.emit({
      date: new Date(this.year, this.month, date),
      nextOrPrevious: false,
    });
    this.handleOnChange.emit(new Date(this.year, this.month, date));
    this.selectedDay = date;
  };

  createCalendar = () => {
    let date = 1;
    this.rows = [];
    for (let i = 0; i < 6; i++) {
      this.columns = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < this.day) {
          this.columns.push('');
        } else if (date > this.daysOfMonth) {
          break;
        } else {
          this.columns.push(date++);
        }
      }
      this.rows.push(this.columns);
    }
  };

  setClasses = (day) => {
    const currentDay = new Date(`${this.month + 1} ${day} ${this.year}`);
    return this._helperService.classList(
      'day-wrapper',
      day === this.selectedDay && 'active',
      this.minDayPresent &&
        currentDay.getTime() < this.minDay.getTime() &&
        'disabled',
      this.maxDayPresent &&
        currentDay.getTime() > this.maxDay.getTime() &&
        'disabled'
    );
  };

  onMouseEnter = (e, day) => {
    e.target.style.background =
      day === this.selectedDay ? this.backgroundColor : this.hoverColor;
  };

  onMouseLeave = (e, day) => {
    e.target.style.background =
      day === this.selectedDay ? this.backgroundColor : 'white';
  };
}
