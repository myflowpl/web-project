import { AfterViewInit, Component, ElementRef, inject, Renderer2, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { injectLoginDialog } from './auth/login-dialog/login-dialog';
import { ProfileStore } from './auth/profile.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected title = 'web';

  
  footer = viewChild('footer', {read: ElementRef});
  renderer = inject(Renderer2);

  loginDialog = injectLoginDialog();

  profileStore = inject(ProfileStore);

  constructor() {
    // console.log('footer el', this.footer())
  }

  ngAfterViewInit(): void {
    // console.log('footer el 2', this.footer())
    // this.renderer.setStyle(this.footer()?.nativeElement, 'background', 'red')
    
  }
  
  handleLogin() {
    this.loginDialog.open('Hej musisz się zalogować by zobaczyć tą stronę')
      .subscribe((res) => console.log('CLOSE', res))
  }

}
