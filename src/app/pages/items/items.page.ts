import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export enum ItemType {
  MAP = 'map',
  TEXT = 'text',
}
const types = Object.entries(ItemType).map(
  entry => ({
    label: entry[0],
    value: entry[1],
  })
)

export interface Item {
  type: ItemType,
  name: string,
  active: boolean,
}

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss']
})
export class ItemsPage implements OnInit {

  types = types;

  fb = inject(FormBuilder);

  form = this.fb.group({
    type: [ItemType.TEXT, [Validators.required], []],
    name: ['', [Validators.required]],
    active: [false, []]
  });

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('is valid', this.form.valid)
    console.log('data', this.form.value)
  }

}
