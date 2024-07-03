// react/src/services/$cookies.ts

interface Cookies {
  [key: string]: string;
}

class CookiesService {
  private cookies: Cookies = {};
  private previousCookies: Cookies = {};
  private isInitialized: boolean = false;

  constructor() {
    this.pollCookies();
  }

  private pollCookies() {
    // Simulate polling cookies from the browser
    setInterval(() => {
      const currentCookies = this.getCookiesFromBrowser();
      if (JSON.stringify(this.previousCookies) !== JSON.stringify(currentCookies)) {
        this.previousCookies = { ...currentCookies };
        this.cookies = { ...currentCookies };
        if (this.isInitialized) {
          this.applyChanges();
        }
      }
    }, 1000);
    this.isInitialized = true;
  }

  private getCookiesFromBrowser(): Cookies {

    const cookies: Cookies = {};
    const documentCookies = document.cookie ? document.cookie.split('; ') : [];
    documentCookies.forEach(cookieString => {
      const [key, value] = cookieString.split('=');

    // Notify subscribers or perform any necessary updates when cookies are updated
    console.log('Cookies have been updated:', this.cookies);
  }
        cookies[key] = decodeURIComponent(value);
      }
    });
    return cookies;
  }

    document.cookie = `${key}=${encodeURIComponent(value)}; path=/;`;
  }

  private applyChanges() {

    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  public get(key: string): string | undefined {
    return this.cookies[key];
  }

  public put(key: string, value: string): void {
    this.cookies[key] = value;

    document.cookie = `${key}=${encodeURIComponent(value)}; path=/;`;
  }

  public remove(key: string): void {

    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    delete this.cookies[key];
  }
}

export const $cookies = new CookiesService();
