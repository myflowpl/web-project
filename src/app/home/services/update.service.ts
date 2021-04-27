import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UpdateAvailableEvent, UpdateDialog } from '../dialogs/update/update.dialog';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(
    private dialog: MatDialog,
    private swUpdate: SwUpdate,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    if(!environment.production) {
      return;
    }
    console.log('SW CONSTRUCTOR');
    if (isPlatformBrowser(platformId)) {
      console.log('SW INIT');
      swUpdate.available.subscribe((event) => {
        console.log('update available', event);
        this.openDialog(event as any);
      });
      swUpdate.activated.subscribe(event => {
        console.log('update activated', event);
      });

      interval(1 * 10 * 1000).subscribe(() => swUpdate.checkForUpdate());
    }
    // this.openDialog(<any>{});
  }
  openDialog(data: UpdateAvailableEvent): void {
    const dialogRef = this.dialog.open(UpdateDialog, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.swUpdate.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
