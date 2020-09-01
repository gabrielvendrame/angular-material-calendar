import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCalendarComponent } from './mat-calendar/mat-calendar.component';
import { MatCalendarImportsModule } from './mat-calendar/mat-calendar-imports.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CustomCalendarHeaderComponent } from './mat-calendar/custom-calendar-header';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { BasicDialogComponent } from './basic-dialog/basic-dialog.component';
import { UpdateServiceWorkerInProductionService } from './services/update-service-worker-in-production.service';


@NgModule({
  declarations: [
    AppComponent,
    MatCalendarComponent,
    CustomCalendarHeaderComponent,
    BasicDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatCalendarImportsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatDialogModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        disableClose: true,
        panelClass: '',
        hasBackdrop: true,
        backdropClass: '',
        width: '',
        height: '',
        maxWidth: '90vw',
        data: null,
        ariaDescribedBy: null,
        ariaLabelledBy: null,
        ariaLabel: null,
        autoFocus: true,
        restoreFocus: true,
        closeOnNavigation: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private updateServiceWorkerInProductionService: UpdateServiceWorkerInProductionService
  ) {
    this.updateServiceWorkerInProductionService.checkForUpdates();
  }
}
