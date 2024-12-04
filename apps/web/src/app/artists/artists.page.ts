import { Component, computed, DestroyRef, Directive, effect, inject, Injectable, input, resource, Signal, signal, untracked, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

export interface Artist {
  id: number;
  name: string;
}

export interface ArtistsDto {
  _limit: number;
  _page: number;
}

export interface ArtistsResponse {
  artists: Artist[];
  total: number;
}

export interface DataStore {
  params: WritableSignal<ArtistsDto>;
  value: WritableSignal<ArtistsResponse | undefined>;
}

@Directive({ selector: '[storePaginator]' })
export class StorePaginatorDirective {

  destroyRef = inject(DestroyRef);
  paginator = inject(MatPaginator);
  storePaginator = input.required<DataStore>();

  page = computed(() => this.storePaginator()?.params()?._page | 1);
  limit = computed(() => this.storePaginator()?.params()?._limit | 50);

  constructor() {
    
    effect(() => {
      const length = this.storePaginator()?.value()?.total || 0;
      this.paginator.length = length;

      const size = this.storePaginator()?.params()?._limit || 50;
      this.paginator.pageSize = size;
    });


    this.paginator.page.pipe(
      map(p => p.pageIndex),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(index => {
      const params: ArtistsDto = {
        _limit: 5,
        _page: index+1,
      } 
      this.storePaginator().params.set(params);
    })


    // const pageIndex = toSignal(
    //   this.paginator.page.pipe(map(p => p.pageIndex)), 
    //   {initialValue: this.paginator.pageIndex}
    // );

    // effect(() => {
    //   const index = pageIndex();

    //   untracked(() => {
        
    //     const params: ArtistsDto = {
    //       _limit: this.limit(),
    //       _page: index+1,
    //     } 
    //     this.storePaginator().params.set(params);

    //   });
    // })


  }
}

@Injectable({providedIn: 'root'})
export class ArtistService {

  http = inject(HttpClient);

  search(params: ArtistsDto): Observable<ArtistsResponse> {
    return this.http.get<Artist[]>('http://localhost:3000/artists', {params: params as any, observe: 'response'}).pipe(
      map(res => {
        return { 
          artists: res.body || [], 
          total: parseInt(res.headers.get('content-length') || '0', 10) 
        }
      }),
    )
  }
}

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, StorePaginatorDirective],
  templateUrl: './artists.page.html',
  styleUrl: './artists.page.css',
})
export class ArtistsPage {

  service = inject(ArtistService);

  params = signal({
    _limit: 5,
    _page: 1,
  });

  artists = rxResource({
    request: () => (this.params()),
    loader: ({ request }) => this.service.search(request),
  });

  store = {
    params: this.params,
    value: this.artists.value,
  }

  error = computed(() => this.artists.error() as HttpErrorResponse | undefined);
}
