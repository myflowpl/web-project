import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { Artist } from '../../../api/api.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {

  @Input()
  artist: Artist | undefined;

  @Input()
  artistId: number | undefined;

  @Output()
  artistDelete = new EventEmitter()
}
