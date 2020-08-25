import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import * as moment from 'moment';


@Component({
  selector: 'app-mat-calendar',
  templateUrl: './mat-calendar.component.html',
  styleUrls: ['./mat-calendar.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class MatCalendarComponent {

  @Output()
  dateSelected: EventEmitter<moment.Moment> = new EventEmitter();

  @Output()
  selectedDate = moment();

  @ViewChild('calendar', {static: true}) calendar: MatCalendar<moment.Moment>;


  constructor(private adapter: DateAdapter<any>) {
    this.adapter.setLocale('it-IT');
  }

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
