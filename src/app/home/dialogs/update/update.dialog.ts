import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateAvailableEvent as UAE } from '@angular/service-worker';

export interface AppData {
  version: string;
  changelog: string;
}
export interface Version {
  hash: string;
  appData?: AppData | any;
}
export interface UpdateAvailableEvent extends UAE {
  type: 'UPDATE_AVAILABLE';
  current: Version;
  available: Version;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.dialog.html',
  styleUrls: ['./update.dialog.scss']
})
export class UpdateDialog implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UpdateAvailableEvent,
  ) {}

  ngOnInit(): void {
  }

}
