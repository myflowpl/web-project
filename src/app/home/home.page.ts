import { AsyncPipe, DatePipe, JsonPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { UserPhotoPipe } from './user-photo.pipe';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { DOMAIN, injectConfig } from '../app.tokens';

// @Injectable({providedIn: 'root'})
// export class HttpClient {
//   route = inject(ActivatedRoute);
// }

interface Profile {
  id: number;
  name: string;
  description: string;
  roles: string[],
  gender: 'male' | 'female'
}

@Component({
  selector: 'app-home',
  imports: [
    UpperCasePipe,
    DatePipe,
    UserPhotoPipe,
    JsonPipe,
    NgFor,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  providers: [

  ],
})
export class HomePage {

  api1BaseUrl = injectConfig().domain;
  baseUrl = injectConfig().baseUrl;

  http = inject(HttpClient);

  title = 'Web Project - Angular';

  today = new Date();

  user = { id: 3 };

  profiles$: Observable<Profile[]>

  // profiles: Profile[] = []

  constructor() {

    const request$ = this.http.get<Profile[]>(this.api1BaseUrl+'/data/test.json').pipe(
      // operators
      shareReplay(),
    );

    this.profiles$ = request$;
    
    // const sub = request$.subscribe({
    //   next: profiles => this.profiles = profiles,
    //   error: (error) => console.log(error),
    //   complete: () => console.log('complete'),
    // })

    // sub.unsubscribe();
  }

  getName() {
    console.log('GET NAME');
    return 'NAME: '
  }

  handleProfileClick(profile: Profile) {
    console.log(profile);
  }

}
