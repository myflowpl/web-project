import { Component, inject, OnInit } from '@angular/core';
import { HomePageStore } from './home.page.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [HomePageStore],
})
export class HomePage implements OnInit {

  store = inject(HomePageStore);

  ngOnInit(): void {
  }

}
