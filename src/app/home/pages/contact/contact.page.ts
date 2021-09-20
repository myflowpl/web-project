import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../api/api.models';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit {

  contacts: Contact[] = [
    {id: 1, name: 'Piotr', email: 'piotr@myflow.pl'},
    {id: 2, name: 'Paweł', email: 'pawel@myflow.pl'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
