import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-container',
  templateUrl: './img-container.component.html',
  styleUrls: ['./img-container.component.scss']
})
export class ImgContainerComponent {
  @Input() src: string;
}
