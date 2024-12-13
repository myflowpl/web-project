import { Role } from "@web/api";
import { injectLoginDialog } from "./login/login.dialog";
import { injectIsServer } from "@web/utils";

export function authGuard(...roles: Role[]) {

    return () => {
        // injection context

        const isServer = injectIsServer();
        if(isServer) {
            return false;
        }
        
        return injectLoginDialog().guard();
    }
}