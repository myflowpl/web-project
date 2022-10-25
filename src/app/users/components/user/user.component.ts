import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../api/api.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnChanges {

  @Input()
  user: User | undefined;

  @Output()
  close = new EventEmitter<{user: User, event: PointerEvent}>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('USER INPUT CHANGE', changes);
  }

  handleClose(event: any, user: User) {
    this.close.emit({user, event});
  }
}
