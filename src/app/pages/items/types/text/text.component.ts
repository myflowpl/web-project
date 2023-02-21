import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../items.page';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input()
  item?: Item;

  ngOnInit(): void {
  }

}
