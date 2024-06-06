// react/src/services/$cookies.ts

interface Cookies {
  [key: string]: string;
}

class CookiesService {
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

  public get(key: string): string | undefined {
    return this.cookies[key];
  }

  public put(key: string, value: string): void {
    this.cookies[key] = value;
    document.cookie = `${key}=${value}`;
  }

  public remove(key: string): void {
    delete this.cookies[key];
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

const cookiesService = new CookiesService();
export default cookiesService;