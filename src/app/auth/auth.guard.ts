import { inject } from "@angular/core"
import { ProfileStore } from "./profile.store"
import { injectLoginDialog } from "./login/login.dialog"

export function authGuard(...roles: string[]) {

    return () => {
        return injectLoginDialog().guard('Requred roles: '+roles.join(', '));

        // return !! inject(ProfileStore).user()
    }
}