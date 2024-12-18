import { effect, inject } from "@angular/core";
import { ProfileStore } from "./profile.store";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

export function logoutWatchDog() {
    const profile = inject(ProfileStore);
    const router = inject(Router);
    const snackbar = inject(MatSnackBar);

    effect(() => {
        if(!profile.user()) {
            // redirect & notify user about lost session
            router.navigateByUrl('/login');
            snackbar.open(
                'You lost your session, You are loggged out NOW :( ',
                '',
                {verticalPosition: 'top', duration: 10000}
            )
        }
    })
}