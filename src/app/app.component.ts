import { Component } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value: string;

  dateSelected(value: Moment): void {
    this.value = moment(value).format('DD/MM/YYYY');
  }
}
