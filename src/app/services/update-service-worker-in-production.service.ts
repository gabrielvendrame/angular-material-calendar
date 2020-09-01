import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { concat, interval } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BasicDialogComponent } from '../basic-dialog/basic-dialog.component';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UpdateServiceWorkerInProductionService {
    constructor(private appRef: ApplicationRef,
                private swUpdate: SwUpdate,
                private matDialog: MatDialog) {
    }

    checkForUpdates(): void {
        if (!environment.production) {
            return;
        }

        // Allow the app to stabilize first, before starting polling for updates with `interval()`.
        const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
        const everythirtySeconds$ = interval(30000); // 30 seconds
        const everythirtySecondsOnceAppIsStable$ = concat(appIsStable$, everythirtySeconds$);

        everythirtySecondsOnceAppIsStable$.subscribe(() => this.swUpdate.checkForUpdate(), (error) => {
            console.log('Errore in swupdate', error);
        });


        this.swUpdate.available.subscribe(() => {

            this.matDialog.open(BasicDialogComponent, {
                data: {
                    title: 'Nuovo aggiornamento disponibile',
                    actions: [
                        {
                            text: 'Annulla',
                            actionName: false
                        },
                        {
                            text: 'Aggiorna',
                            actionName: true
                        }
                    ]
                }
            }).afterClosed().subscribe(confirm => {
                if (confirm !== true) {
                    return;
                } else {
                    this.swUpdate.activateUpdate().then(() => window.location.reload());
                }
            });
        });
    }

}
