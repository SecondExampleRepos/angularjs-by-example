// react/src/services/$cookieStore.ts

interface Cookies {
  [key: string]: string;
}

class CookieStore {
  private cookies: Cookies;

  constructor() {
    this.cookies = this.getCookies();
  }

  private getCookies(): Cookies {
    const cookies: Cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookies[name.trim()] = value;
    });
    return cookies;
  }

  public get(key: string): any {
    const value = this.cookies[key];
    return value ? JSON.parse(value) : value;
  }

  public put(key: string, value: any): void {
    this.cookies[key] = JSON.stringify(value);
    document.cookie = `${key}=${this.cookies[key]}`;
  }

  public remove(key: string): void {
    delete this.cookies[key];
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

export default new CookieStore();
