import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface Artist {
    id: number;
    name: string;
}

export interface ArtistDto {
    _page: number;
    _limit: number;
}

export interface ArtistResponse {
    artists: Artist[];
    length: number;
}

@Injectable({providedIn: 'root'})
export class ArtistsService {

    baseUrl = 'http://localhost:3000';

    http = inject(HttpClient)

    search(params: ArtistDto): Observable<ArtistResponse> {
        return this.http.get<Artist[]>(this.baseUrl+'/artists', {observe: 'response', params: params as any}).pipe(
            map(res => ({
                artists: res.body || [],
                length: parseInt(res.headers.get('content-leght') || '0', 10),
            })),
        );
    }
}