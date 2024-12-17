import { DestroyRef, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";

export function injectUpdateTitle() {
    const titleService = inject(Title);

    const backup = titleService.getTitle();

    const destroyRef = inject(DestroyRef);

    destroyRef.onDestroy(() => titleService.setTitle(backup));

    return (title: string) => {
        titleService.setTitle(title);
    }
}