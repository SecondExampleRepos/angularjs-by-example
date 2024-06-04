// react/src/services/$cookies.ts

interface Cookies {
  [key: string]: string;
}

class CookiesService {
  private cookies: Cookies = {};
  private previousCookies: Cookies = {};
  private isInitialized: boolean = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.pollCookies();
    this.isInitialized = true;
  }

  private pollCookies() {
    // Simulate polling cookies from a browser
    const currentCookies = this.getBrowserCookies();
    if (this.previousCookies !== currentCookies) {
      this.previousCookies = { ...currentCookies };
      this.cookies = { ...currentCookies };
      if (this.isInitialized) {
        this.applyChanges();
      }
    }
  }

  private getBrowserCookies(): Cookies {
    const cookies: Cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      if (name && value) {
        cookies[name] = value;
// Notify subscribers about the cookie changes
// This could be implemented using an event emitter or a state management library like Redux
// For simplicity, we'll use a basic event emitter pattern

type Listener = () => void;
private listeners: Listener[] = [];

public subscribe(listener: Listener) {
  this.listeners.push(listener);
}

public unsubscribe(listener: Listener) {
  this.listeners = this.listeners.filter(l => l !== listener);
}

private applyChanges() {
  this.listeners.forEach(listener => listener());
}
    document.cookie = Object.entries(this.cookies)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('; ');
    return cookies;
    return {};
  }

  private applyChanges() {
  private applyChanges() {
    this.listeners.forEach(listener => listener());
  }
  }

  public get(key: string): string | undefined {
    return this.cookies[key];
  }

  public put(key: string, value: string) {
    this.cookies[key] = value;
    this.updateBrowserCookies();
  }

  public remove(key: string) {
    delete this.cookies[key];
    this.updateBrowserCookies();
  }
document.cookie = Object.entries(this.cookies)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  .join('; ');
  private updateBrowserCookies() {
    document.cookie = Object.entries(this.cookies)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('; ');
  }
}

const cookiesService = new CookiesService();
export default cookiesService;