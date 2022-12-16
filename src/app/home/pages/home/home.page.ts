import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivateComponent } from '../../../auth/guards/auth.guard';
import { HomePageStore } from './home.page.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [HomePageStore],
})
export class HomePage implements OnInit, AfterViewInit, CanDeactivateComponent {
  store = inject(HomePageStore);

  @ViewChild('searchInput')
  searchInput: ElementRef | undefined;

  ngOnInit(): void {
    console.log('serach input', this.searchInput?.nativeElement);
  }
  ngAfterViewInit(): void {
    console.log('serach input 2', this.searchInput?.nativeElement);
  }

  canDeactivate(): boolean | Observable<boolean> {
    const canDeactivate = confirm(
      'Twoje wyszukianie trwa! Czy chcesz mimo to wyjść ?'
    );

    return canDeactivate;
  }
}
