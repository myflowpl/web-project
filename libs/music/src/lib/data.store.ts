import { ComponentStore } from "@ngrx/component-store";
import { EMPTY, catchError, pipe, tap } from "rxjs";
import { Injectable, inject } from "@angular/core";
import { Artist, Song } from "@asseco/api-client";
import { Observable, delay, switchMap } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Sort } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";

export function tapStore<T>(store: ComponentStore<any>, nextFn: (v: T) => void) {
    return pipe(
        tap<T>({
            subscribe: () => {
                store.patchState({ 
                    loading: true,
                    error: null,
                })
            },
            finalize: () => {
                store.patchState({ loading: false })
            },
            next: nextFn
        }),
        catchError(error => {
            store.patchState({ error });
            return EMPTY;
        }),

    );
}

export interface Filters {
    q?: string,
}

export interface State<E, F = Filters> {
    data: E[];
    sort: Sort;
    page: PageEvent;
    filters: F;
    error?: HttpErrorResponse;
    loading: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class DataStore<E, F> extends ComponentStore<State<E, F>> {

    loading$ = this.select(s => s.loading);
    data$ = this.select(s => s.data);
    page$ = this.select(s => s.page);
    sort$ = this.select(s => s.sort);
    
    constructor() {

        const initState: State<E, F> = {
            loading: false,
            data: [],
            filters: {} as any,
            sort: {
                active: '',
                direction: '',
            },
            page: {
                length: 40,
                pageIndex: 0,
                pageSize: 5,
            }
        }
        super(initState);
        this.state$.subscribe(s => console.log(s))
    }

    set sort(sort: Sort) {
        this.patchState({
            sort,
            page: {
                ...this.page,
                pageIndex: 0,
            }
        });
        this.init();
    }

    get sort(): Sort {
        return this.get().sort;
    }

    set page(page: PageEvent) {
        this.patchState({page});
        this.init();
    }

    get page(): PageEvent {
        return this.get().page;
    }

    set filters(filters: F) {

        let entires = Object.entries(filters as object);

        entires = entires.filter(([_, v]) => !!v);

        filters = Object.fromEntries(entires) as F;
        
        this.patchState({ filters });
        this.init();
    }

    get filters(): F {
        return this.get().filters;
    }

    protected fetch(): Observable<PaginatedData<E>> {
        return EMPTY;
    }

    readonly init = this.effect((data$: Observable<void>) => {
        return data$.pipe(
            switchMap(() => this.fetch().pipe(
                tapStore(
                    this,
                    (res) => this.patchState({
                        data: res.data || [],
                        page: {
                            ...this.page,
                            length: res.length
                        }
                    }),
                ),
            )),
        );
    });

}

export interface PaginatedData<E> {
    data: E[];
    length: number;
}