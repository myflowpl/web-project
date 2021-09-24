import { Component, OnInit } from '@angular/core';
import { ContactFacade } from '../../+contact/contact.facade';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit {

  contacts$ = this.contactFacade.contacts$;

  constructor(
    private contactFacade: ContactFacade,
  ) { }

  ngOnInit(): void {
  }

}
