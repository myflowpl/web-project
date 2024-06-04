import { inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

export function injectQueryParamNumber(name: string) {
    
    const route = inject(ActivatedRoute);

    const id$ = route.queryParamMap.pipe(
      map(queryParams => queryParams.get(name) || ''),
      map(id => parseInt(id, 10) || 0)
    );

    return toSignal(id$, {initialValue: 0});
}