import { Component, OnInit, Optional } from '@angular/core';
import * as moment from 'moment';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './mat-calendar/confirmation-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  value: string;


  constructor(
    @Optional() private swUpdate: SwUpdate,
    public dialog: MatDialog
  ) {
  }

  dateSelected(value: moment.Moment): void {
    this.value = moment(value).format('DD/MM/YYYY');
    console.log(this.value);
  }

  ngOnInit(): void {
    setInterval(() => {
      this.checkForUpdates();
    }, 5000);
  }

  checkForUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.openDialog();
      });
    } else {
      console.log('Service Worker not enabled');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Nuovo aggiornamento disponibile',
        buttonText: {
          ok: 'Aggiorna',
          cancel: 'Esci'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.swUpdate.activateUpdate().then(() => window.location.reload());
      }
    });
  }
}
