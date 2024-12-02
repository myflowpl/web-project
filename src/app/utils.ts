import { inject, Signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";


export function injectQueryParam<T = String>(name: string, defaultValue = ''): Signal<T> {

    const route = inject(ActivatedRoute);

    const initialValue = route.snapshot.queryParamMap.get(name) || defaultValue;

    const param = toSignal(route.queryParamMap.pipe(
        map(params => params.get(name) || defaultValue),
    ), { initialValue });

    return param as Signal<T>;
}