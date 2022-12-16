import { Component, ElementRef, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  constructor(private header: HeaderComponent, private elementRef: ElementRef) {
    // console.log('user info ma header', this.header)
    // console.log('user info el', this.elementRef)
  }

  ngOnInit(): void {}
}
