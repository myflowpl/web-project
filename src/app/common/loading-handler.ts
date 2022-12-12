import { Injectable, OnDestroy } from "@angular/core";
import { tap } from "rxjs";

@Injectable()
export class LoadingHandler implements OnDestroy {

  active = false;

  tap() {
    return tap({
      subscribe: () => this.active = true,
      finalize: () => this.active = false,
    })
  }

  ngOnDestroy(): void {

  }
}
