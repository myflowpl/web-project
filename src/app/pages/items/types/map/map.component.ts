import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../items.page';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input()
  item?: Item;

  ngOnInit(): void {
  }

}
