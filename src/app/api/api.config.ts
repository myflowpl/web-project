import { InjectionToken, inject } from "@angular/core";
import { Router } from "@angular/router";

export const BASE_URL = new InjectionToken<string>('BASE_URL', {
    factory: () => {
        const router = inject(Router);
        
        return 'http://localhost:3000';
    },
    
})
