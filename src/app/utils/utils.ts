import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { inject, PLATFORM_ID } from "@angular/core";


export function injectIsServer() {
    const platformId = inject(PLATFORM_ID);
    return isPlatformServer(platformId);
}

export function injectIsBrowser() {
    const platformId = inject(PLATFORM_ID);
    return isPlatformBrowser(platformId);
}

export function injectWindow() {
    return (typeof window === 'undefined') ? undefined : window;
}



export class LocalStorageMock implements Storage {
  
    [name: string]: any;
  
    private items: any  = {} as any;
  
    length: number = 0;
  
    clear(): void {
      this.items = {} as any;
    }
    getItem(key: string): string | null {
      return this.items[key];
    }
    key(index: number): string | null {
      const keys = Object.keys(this.items);
      return keys[index];
    }
    removeItem(key: string): void {
      delete this.items[key];
    }
    setItem(key: string, value: string): void {
      this.items[key] = value;
    }
  
}

export function injectLocalStorage() {
    return (injectIsServer()) ? new LocalStorageMock() : localStorage;
}