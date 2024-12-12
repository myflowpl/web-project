import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface PetFormDialogData {

}

export function injectPetFormDialog() {

  const dialog = inject(MatDialog);

  return {
    open(data: PetFormDialogData) {
      const dialogRef = dialog.open(PetFormDialog, {
        width: '300px',
        data,
      })
      return dialogRef.afterClosed().pipe();
    }
  }
}

@Component({
  selector: 'lib-pet-form',
  imports: [CommonModule],
  templateUrl: './pet-form.dialog.html',
  styleUrl: './pet-form.dialog.scss',
})
export class PetFormDialog {
  data: PetFormDialogData = inject(MAT_DIALOG_DATA);

}
