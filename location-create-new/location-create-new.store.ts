import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

interface LocationCreateNewDialogData {
  message?: string;
}
interface LocationCreateNewDialogResponse {}

export function injectLocationCreateNewDialog() {
  const dialog = inject(MatDialog);

  return {
    open(message?: string) {
      const dialogRef = dialog.open<
        LocationCreateNewDialog,
        LocationCreateNewDialogData,
        LocationCreateNewDialogResponse
      >(LocationCreateNewDialog, {
        data: { message },
      });

      return dialogRef.afterClosed();
    },
  };
}

@Component({
  selector: 'app-location-create-new',
  imports: [MatDialogContent, MatDialogTitle],
  templateUrl: './location-create-new.html',
  styleUrl: './location-create-new.scss',
})
export class LocationCreateNewDialog {
  data = inject<LocationCreateNewDialogData>(MAT_DIALOG_DATA);
  dialogRef =
    inject<MatDialogRef<LocationCreateNewDialogResponse>>(MatDialogRef);
}
