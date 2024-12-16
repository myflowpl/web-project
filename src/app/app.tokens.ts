import { isPlatformServer } from "@angular/common";
import { inject, InjectionToken, PLATFORM_ID } from "@angular/core";

export const API_1_BASE_URL = new InjectionToken<string>("API 1 BASE URL");


export interface Config {
    api1BaseUrl: string;
    baseUrl: string;
}

export const CONFIG = new InjectionToken<Config>("CONFIG", {
    factory: () => ({} as Config)
});

export function injectConfig(): Config {
    return inject(CONFIG)
}

export function injectIsPlatformServer(): boolean {
    return isPlatformServer(inject(PLATFORM_ID));
}

