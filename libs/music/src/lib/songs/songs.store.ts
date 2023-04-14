import { Injectable, inject } from "@angular/core";
import { Song } from "@asseco/api-client";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataStore } from "../data.store";

export interface SongsFilters {
    q?: string, 
    year?: string
}

@Injectable()
export class SongsStore extends DataStore<Song, SongsFilters> {

    private baseUrl = 'http://localhost:3000';
    private http = inject(HttpClient);

    columns = ['id',  'title', 'year'];

    constructor() {
        super();
        this.sort = {
            active: 'title',
            direction: 'asc',
        }
    }

    override fetch() {
        const params = {
            ...this.filters,
            _sort: this.sort.active,
            _order: this.sort.direction,
            _page: this.page.pageIndex+1,
            _limit: this.page.pageSize,
        }
        return this.http.get<Song[]>(this.baseUrl+'/songs', { params, observe: 'response' }).pipe(
            map((res) => ({
                data: res.body || [],
                length: parseInt(res.headers.get('x-total-count') || '0'),
            })),
        )
    }

}