// react/src/services/$cookies.ts

interface Cookies {
  [key: string]: string;
}

class CookiesService {
  private cookies: Cookies = {};

  constructor() {
    this.init();
  }

  private init() {
    this.cookies = this.getCookiesFromDocument();
    // You might want to set up a polling mechanism or event listeners here if needed
    // You might want to set up a polling mechanism or event listeners here if needed
    setInterval(() => {
          const newCookies = this.getCookiesFromDocument();
          if (JSON.stringify(newCookies) !== JSON.stringify(this.cookies)) {
            this.cookies = newCookies;
            // Notify subscribers or update state if needed
          }
        }, 5000); // Poll every 5 seconds
  }

  private getCookiesFromDocument(): Cookies {
    const cookies: Cookies = {};
    const documentCookies = document.cookie ? document.cookie.split('; ') : [];
    for (let cookie of documentCookies) {
      const [name, ...rest] = cookie.split('=');
      cookies[name] = rest.join('=');
    }
    return cookies;
  }

  public get(name: string): string | undefined {
    return this.cookies[name];
  }

  public put(name: string, value: string): void {
    this.cookies[name] = value;
    document.cookie = `${name}=${value}`;
  }

  public remove(name: string): void {
    delete this.cookies[name];
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

const cookiesService = new CookiesService();
export default cookiesService;