import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    AppService
  ],
})
export class HeaderComponent implements OnInit {

  constructor(
    private appService: AppService
  ) {
    // console.log('header id', this.appService.id)
   }

  ngOnInit(): void {
  }

}
