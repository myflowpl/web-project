import { Component, inject, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  // providers: [AppService]
})
export class FooterComponent implements OnInit {
  appService = inject(AppService);

  constructor() {
    // console.log('footer id', this.appService.id)
  }

  ngOnInit(): void {}
}
