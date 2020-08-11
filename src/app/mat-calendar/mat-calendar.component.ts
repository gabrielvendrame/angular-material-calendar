import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import * as moment from 'moment';


@Component({
  selector: 'app-mat-calendar',
  templateUrl: './mat-calendar.component.html',
  styleUrls: ['./mat-calendar.component.css']
})
export class MatCalendarComponent {

  @Output()
  dateSelected: EventEmitter<moment.Moment> = new EventEmitter();

  @Output()
  selectedDate = moment();

  @ViewChild('calendar', {static: true}) calendar: MatCalendar<moment.Moment>;

  monthSelected(date: moment.Moment): void {
    console.log('month changed');
  }

  dateChanged(): void {
    this.calendar.activeDate = this.selectedDate;
    this.dateSelected.emit(this.selectedDate);
  }

  prevDay(): void {
    this.selectedDate = moment(this.selectedDate).add(-1, 'days');
    this.dateChanged();
  }

  today(): void {
    this.selectedDate = moment();
    this.dateChanged();
  }

  nextDay(): void {
    this.selectedDate = moment(this.selectedDate).add(1, 'days');
    this.dateChanged();
  }

}
