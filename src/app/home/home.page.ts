import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { UserPhotoPipe } from './user-photo.pipe';

@Component({
  selector: 'app-home',
  imports: [
    UpperCasePipe,
    DatePipe,
    UserPhotoPipe,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {

  title = 'Web Project - Angular';

  today = new Date();

  user = { id: 3 };

}
