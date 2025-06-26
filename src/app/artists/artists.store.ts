import { inject, Injectable, signal } from "@angular/core";
import { Artist, ArtistsApi } from "@web/api-client";
import { loaderSignal } from "@web/utils";
import { pipe, tap } from "rxjs";


@Injectable()
export class ArtistsStore {

    artistApi = inject(ArtistsApi);

    artists = signal<Artist[]>([]);
    isLoading = loaderSignal();
    error = signal<any>(null);

    load() {

        this.artistApi.artistsGet()
            .pipe(
                this.isLoading.tap(),
            )
            .subscribe({
                next: (res) => this.artists.set(res.data),
                error: (res) => this.error.set(res),
            })
    }

}