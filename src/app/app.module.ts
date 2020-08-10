import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCalendarComponent } from './mat-calendar/mat-calendar.component';
import { MatCalendarImportsModule } from './mat-calendar/mat-calendar-imports.module';


@NgModule({
  declarations: [
    AppComponent,
    MatCalendarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatCalendarImportsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
