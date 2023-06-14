import { Component, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

export interface SongDeactivateData {
  title: string;
}

@Injectable({providedIn: 'root'})
export class SongEditDeactivateDialog {

  dialog = inject(MatDialog);

  open(data: SongDeactivateData): Observable<boolean> {

      const dialogRef = this.dialog.open(SongEditDeactivateDialogComponent, {
        width: '500px',
        disableClose: true,
        data
      });

      return dialogRef.afterClosed();
  }
}

@Component({
  selector: 'app-song-edit-deactivate',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './song-edit-deactivate.dialog.html',
  styleUrls: ['./song-edit-deactivate.dialog.scss']
})
export class SongEditDeactivateDialogComponent {

  dialogRef = inject(MatDialogRef);

  data?: SongDeactivateData = inject(MAT_DIALOG_DATA);

  handleNo() {
    this.dialogRef.close(false);
  }
  handleYes() {
    this.dialogRef.close(true);
  }

}
