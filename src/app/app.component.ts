import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'web-project';

  constructor(private appService: AppService) {
    // console.log('app id', this.appService.id)
  }

  getUsers() {
    return ['user 1', 'user 2'];
  }
}
