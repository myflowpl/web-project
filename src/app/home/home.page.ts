import { DatePipe, JsonPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { UserPhotoPipe } from './user-photo.pipe';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  providers: [
    HttpClient
  ],
})
export class HomePage {

  http = inject(HttpClient);

  title = 'Web Project - Angular';

  today = new Date();

  user = { id: 3 };

  profiles: Profile[] = []

  constructor() {

    this.http.get<Profile[]>('http://localhost:4200/data/test.json').subscribe(
      profiles => this.profiles = profiles
    )
  }

}
