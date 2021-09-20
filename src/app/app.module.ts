import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



// typescript rzutowanie typów

// class User {
//   readonly id: number;
//   name: string;
//   role? = 'root';

//   constructor(id: number, name: string) {
//     this.id = id;
//     this.name = name;
//   }
// }

// let user: User = {
//   id: 1,
//   name: "Piotr",
// };
// user.name = 'dsfds';
// // user.id = 55;

// console.log('name', (user as User).name)
// console.log('instance of', user instanceof User); // ???

// user = new User(2, 'Paweł')

// console.log('instance of user2', user instanceof User); // ???
