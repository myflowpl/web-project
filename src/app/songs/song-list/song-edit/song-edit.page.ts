import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.page.html',
  styleUrls: ['./song-edit.page.scss']
})
export class SongEditPage implements OnInit {

  route = inject(ActivatedRoute);

  id?: number;

  id$ = this.route.paramMap.pipe(
    map(params => parseInt(params.get('id') || '') )
  );

  ngOnInit(): void {
    
    const param$ = this.route.paramMap;

    param$.pipe(
      map(params => parseInt(params.get('id') || '') )
    )
    .subscribe(id => {
      this.id = id;
    });
  }
}
