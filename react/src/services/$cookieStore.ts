// react/src/services/$cookieStore.ts

export class CookieStore {
  private cookies: { [key: string]: string } = {};

  get(key: string): any {
    const value = this.cookies[key];
    return value ? JSON.parse(value) : value;
  }

  put(key: string, value: any): void {
    this.cookies[key] = JSON.stringify(value);
  }

  remove(key: string): void {
    delete this.cookies[key];
  }
}
