import { injectIsPlatformServer } from "../app.tokens";


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
    const isServer = injectIsPlatformServer();

    return isServer ? new LocalStorageMock() : localStorage;
}

export function injectWindow() {
    const isServer = injectIsPlatformServer();

    return isServer ? undefined : window;
}