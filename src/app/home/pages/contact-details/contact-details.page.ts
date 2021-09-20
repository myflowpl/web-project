import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-details-page',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss']
})
export class ContactDetailsPage implements OnInit {

  id: string | undefined;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params.id)
  }

}
