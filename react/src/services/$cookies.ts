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

    const currentCookies = this.getBrowserCookies();
    if (JSON.stringify(this.previousCookies) !== JSON.stringify(currentCookies)) {
      this.previousCookies = { ...currentCookies };

    const currentCookies = this.getCookiesFromBrowser();
    let changesDetected = false;

    // Check for cookies that need to be added or updated
    for (const key in this.cookies) {
      if (this.cookies[key] !== currentCookies[key]) {
        this.setCookieInBrowser(key, this.cookies[key]);
        changesDetected = true;
      }
    }

    // Check for cookies that need to be removed
    for (const key in currentCookies) {
      if (!(key in this.cookies)) {
        this.removeCookieFromBrowser(key);
        changesDetected = true;
      }
    }

    // Update previousCookies if changes were detected
    if (changesDetected) {
      this.previousCookies = { ...this.cookies };
    }
  }

  private getCookiesFromBrowser(): Cookies {
    const cookies: Cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookies[name.trim()] = value;
    });
    return cookies;
  }

  private setCookieInBrowser(name: string, value: string) {
    document.cookie = `${name}=${value}`;
  }

  private removeCookieFromBrowser(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
      if (this.isInitialized) {
        this.applyChanges();
      }
    }
    setTimeout(() => this.pollCookies(), 1000); // Poll every second
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
        this.setCookieInBrowser(key, this.cookies[key]);
        changesDetected = true;
      }
    }

    // Check for cookies that need to be removed
    for (const key in currentCookies) {
      if (!(key in this.cookies)) {
        this.removeCookieFromBrowser(key);
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
