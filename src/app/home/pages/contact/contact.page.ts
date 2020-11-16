import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit {

  contacts = [
    {id: 1, name: 'Piotr', email: 'piotr@myflow.pl'},
    {id: 2, name: 'Paweł', email: 'pawel@myflow.pl'},
    {id: 3, name: 'Iwona', email: 'iwona@myflow.pl'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
