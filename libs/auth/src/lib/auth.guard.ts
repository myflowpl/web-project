import { Role } from "@web/api";
import { injectLoginDialog } from "./login/login.dialog";

export function authGuard(...roles: Role[]) {

    return () => {
        // injection context
        
        return injectLoginDialog().guard();
    }
}