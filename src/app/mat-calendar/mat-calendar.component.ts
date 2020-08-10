import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-mat-calendar',
  templateUrl: './mat-calendar.component.html',
  styleUrls: ['./mat-calendar.component.css']
})
export class MatCalendarComponent {

  @Output()
  dateSelected: EventEmitter<Moment> = new EventEmitter();

  @Output()
  selectedDate = moment();

  @ViewChild('calendar', {static: true}) calendar: MatCalendar<Moment>;

  monthSelected(date: Moment): void {
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
