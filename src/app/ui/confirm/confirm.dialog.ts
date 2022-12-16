import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm.dialog.html',
  styleUrls: ['./confirm.dialog.scss'],
})
export class ConfirmDialog implements OnInit {
  appService = inject(AppService);
  appService2 = inject(AppService);
  appService3 = inject(AppService);

  constructor() // private appService: AppService,
  {
    // console.log('confirm id', this.appService.id)
  }

  ngOnInit(): void {}
}
