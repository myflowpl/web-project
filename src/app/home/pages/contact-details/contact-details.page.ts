import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss']
})
export class ContactDetailsPage implements OnInit {

  params: any;

  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.params = params)
  }

}
