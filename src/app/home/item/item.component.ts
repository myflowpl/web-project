import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../home.page';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  saving = false;

  @Input()
  item?: Item;

  @Output()
  saveSuccess = new EventEmitter<Item>();

  onSaveClick() {

    this.saving = true;

    setTimeout(() => {
      this.saving = false;
      this.saveSuccess.emit(this.item);
    }, 3000);

  }
}
