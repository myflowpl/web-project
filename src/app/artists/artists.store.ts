import { DestroyRef, inject, Injectable, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Artist, ArtistsApi } from "@web/api-client";
import { loaderSignal } from "@web/utils";

@Injectable()
export class ArtistsStore {

    artistApi = inject(ArtistsApi);

    artists = signal<Artist[]>([]);

    isLoading = loaderSignal();
    destroyRef = inject(DestroyRef);

    load() {
        this.artistApi.artistsGet()
            .pipe(
                this.isLoading.tap(),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe({
                next: (res) => this.artists.set(res.data),
            })
    }

}