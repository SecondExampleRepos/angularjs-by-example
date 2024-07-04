// src/services/$cookies.ts

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

    const currentCookies = this.getBrowserCookies();
    if (JSON.stringify(this.previousCookies) !== JSON.stringify(currentCookies)) {
      this.previousCookies = { ...currentCookies };

    const currentCookies = this.getBrowserCookies();
    let changesDetected = false;

    // Check for cookies that need to be added or updated
    for (const key in this.cookies) {
      if (this.cookies[key] !== currentCookies[key]) {
        this.setBrowserCookie(key, this.cookies[key]);
        changesDetected = true;
      }
    }

    // Check for cookies that need to be removed
    for (const key in currentCookies) {
      if (!(key in this.cookies)) {
        this.removeBrowserCookie(key);
        changesDetected = true;
      }
    }

    // Update previousCookies if changes were detected
    if (changesDetected) {
      this.previousCookies = { ...this.cookies };
    }
  }

  private getBrowserCookies(): Cookies {
    const cookies: Cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      cookies[name] = value;
    });
    return cookies;
  }

  private setBrowserCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/`;
  }

  private removeBrowserCookie(name: string) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
      if (this.isInitialized) {
        this.applyChanges();
      }
    }
  }

  private getBrowserCookies(): Cookies {
    const cookies: Cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookies[name.trim()] = value;
    });
    return cookies;
  }

  private applyChanges() {

    const currentCookies = this.getBrowserCookies();
    let changesDetected = false;

    // Check for cookies that need to be added or updated
    for (const key in this.cookies) {
      if (this.cookies[key] !== currentCookies[key]) {
        this.setBrowserCookie(key, this.cookies[key]);
        changesDetected = true;
      }
    }

    // Check for cookies that need to be removed
    for (const key in currentCookies) {
      if (!(key in this.cookies)) {
        this.removeBrowserCookie(key);
        changesDetected = true;
      }
    }

    // Update previousCookies if changes were detected
    if (changesDetected) {
      this.previousCookies = { ...this.cookies };
    }
  }

  public getCookies(): Cookies {
    return this.cookies;
  }

  public setCookie(name: string, value: string) {
    this.cookies[name] = value;
    this.applyChanges();
  }

  public removeCookie(name: string) {
    delete this.cookies[name];
    this.applyChanges();
  }
}

export const cookiesService = new CookiesService();
