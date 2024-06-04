// react/src/services/$cookieStore.ts

interface Cookies {
  [key: string]: string;
}

class CookieStore {
  private cookies: Cookies = {};

  constructor() {
    this.loadCookies();
  }

  private loadCookies() {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const [key, value] = cookie.split('=');
      this.cookies[key.trim()] = value;
    });
  }

  get(key: string): any {
    const value = this.cookies[key];
    return value ? JSON.parse(value) : null;
  }

  put(key: string, value: any) {
    this.cookies[key] = JSON.stringify(value);
    document.cookie = `${key}=${this.cookies[key]}`;
  }

  remove(key: string) {
    delete this.cookies[key];
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

export default new CookieStore();