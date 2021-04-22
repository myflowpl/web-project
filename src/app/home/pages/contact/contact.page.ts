import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../api/api.models';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit {

  public contacts: Contact[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
