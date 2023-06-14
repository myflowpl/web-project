import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface SongDeactivateData {
  title: string;
}

@Component({
  selector: 'app-song-edit-deactivate',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './song-edit-deactivate.dialog.html',
  styleUrls: ['./song-edit-deactivate.dialog.scss']
})
export class SongEditDeactivateDialog {

  dialogRef = inject(MatDialogRef);

  data?: SongDeactivateData = inject(MAT_DIALOG_DATA);

  handleNo() {
    this.dialogRef.close(false);
  }
  handleYes() {
    this.dialogRef.close(true);
  }

}
