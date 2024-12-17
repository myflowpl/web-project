import { isPlatformServer } from "@angular/common";
import { inject, InjectionToken, PLATFORM_ID } from "@angular/core";

export const DOMAIN = new InjectionToken<string>("DOMAIN");

export interface Config {
    domain: string;
    baseUrl: string;
    createPhotoUrl(id: string): string;
}

export const CONFIG = new InjectionToken<Config>("CONFIG", {
    factory: () => ({
        createPhotoUrl(id: string) {
            return this.domain+'/'+id
        }
    } as Config)
});

export function injectConfig(): Config {
    return inject(CONFIG)
}

export function injectIsPlatformServer(): boolean {
    return isPlatformServer(inject(PLATFORM_ID));
}

