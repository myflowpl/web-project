import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HomePageStore } from './home.page.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [HomePageStore],
})
export class HomePage implements OnInit, AfterViewInit {

  store = inject(HomePageStore);

  @ViewChild('searchInput')
  searchInput: ElementRef | undefined;

  ngOnInit(): void {
    console.log('serach input', this.searchInput?.nativeElement)
  }
  ngAfterViewInit(): void {
    console.log('serach input 2', this.searchInput?.nativeElement)
  }

}
